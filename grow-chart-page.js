/*-------------------------------------------------------------
SETTINGS
-------------------------------------------------------------*/
	var growchart_settings = {};
	//the 'print chart' URL
	growchart_settings.printURL = "http://polyducks.co.uk/growchart/print-chart.html";
	growchart_settings.mobileBreakpoint = 759;

/*-------------------------------------------------------------
TOOLS
-------------------------------------------------------------*/

	/*------------------------
	RUN CODE ON PAGE READY
	jquery independent '.ready()' function
	------------------------*/
	function Page_Ready(callback){
		var activated = false;
		if (document.readyState == "interactive" || document.readyState == "complete"){
			activated = true;
			callback();
		}else{
			document.addEventListener("readystatechange", function(){
				if (( document.readyState == "interactive" || document.readyState == "complete" ) && !activated){
					activated = true;
					callback();
				}
			});
		}
	}

	/*------------------------
	ADD CLASS
	------------------------*/
	var Add_Class = function(targetElement, className){
		Remove_Class(targetElement, className);
		var prefixedSpace = "";
		if (targetElement.className.length > 0){
			prefixedSpace = " ";
		}
		targetElement.className += prefixedSpace + className;
	}
	
	/*------------------------
	FIND CLASS
	------------------------*/
	var Find_Class = function(targetElement, className){
		var regex = new RegExp( "^(" + className + ")|\\s+(" + className + ")", "g" );
		if (targetElement.className.match(regex)){
			return true;
		}
		return false;
	}

	/*------------------------
	REMOVE CLASS
	------------------------*/
	var Remove_Class = function(targetElement, className){
		// Make a regex that matches the classname with or without the space
		// ^(className)|\s+(className)
		var regex = new RegExp( "^(" + className + ")|\\s+(" + className + ")", "g" );
		targetElement.className = targetElement.className.replace( regex, "");
	}

/*-------------------------------------------------------------
MAIN
-------------------------------------------------------------*/

	function GROWCHART(){
		var global = {};
		
		//plantData set in growchart-data.js

		/*--------------------------------------------
		VARIABLES
		--------------------------------------------*/
		var chartArray = []; //array of ints

		/*--------------------------------------------
		SETTINGS
		--------------------------------------------*/
		var settings = {};
			settings.plantPercentWidth = 20;
			settings.location = "north"; //or south
		
		/*--------------------------------------------
		VARIABLES
		--------------------------------------------*/
		var selected = 0; //the vegetable which is currently selected
		var scrollAmount = 0; //how far the selector is scrolled by
		
		var el = {};
			el.locationContainer = document.getElementById("grc-location-container");
			el.locationButtons = document.getElementsByClassName("grc-location-radio");
			
			el.scrollContainer = document.getElementById("grc-scroll-element-container");
			el.scrollPlants = document.getElementsByClassName("grc-scroll-plant");
			el.scrollLeft = document.getElementById("grc-scroll-left");
			el.scrollRight = document.getElementById("grc-scroll-right");
			el.plantsArray = [];
			
			el.plantTitle = document.getElementById("grc-plant-title");
			el.chartButton = document.getElementById("grc-chart-button");
			el.buyButton = document.getElementById("grc-buy-button");
			el.articleButton = document.getElementById("grc-article-button");
			el.articleButtonText = document.getElementById("grc-article-button-text");
			el.clearButton = document.getElementById("grc-clear-chart");
			
			el.chart = document.getElementById("grc-table");
			el.chart.rows = document.getElementById("grc-data-rows");

		/*--------------------------------------------
		USEFUL FUNCTIONS
		--------------------------------------------*/
		
			//CHECK IF ITEM IS IN CHART
			var ItemInChart = function( plantID ){
				var index = chartArray.indexOf( plantID );
				if ( index == -1 ){
					return -1;
				}
				return index;
			}

			//CHANGE STYLES ON CHART ADD/REMOVE
			function StyleAddRemoveButton(){
				if ( ItemInChart( selected ) >= 0 ){
					Add_Class(el.plantsArray[selected], "active");
					Add_Class(el.chartButton, "in-chart");
				}else{
					Remove_Class(el.plantsArray[selected], "active");
					Remove_Class(el.chartButton, "in-chart");
				}
			}
		
		/*--------------------------------------------
		INITIALISE
		--------------------------------------------*/
		function Init(){
			PopulatePlants();
			
			/*----------------------------------------
			EVENT LISTENERS
			----------------------------------------*/
			
			//ON WINDOW RESIZE
			function ResponsiveReaction(){
				if (window.innerWidth >= growchart_settings.mobileBreakpoint){
					settings.plantPercentWidth = 20;
				}else{
					settings.plantPercentWidth = 50;
				}
				SetScroll(0);
			}
			window.addEventListener("resize", function(){
				ResponsiveReaction();
			});
			
			//ON CHANGE OF THE UK LOCATION
			function LocationChange(){
				var loc = "north";
				if (el.locationButtons[1].checked){
					loc = "south";
				}
				if (settings.location != loc){ //If the location has changed, do something
					settings.location = loc;
					PopulateChart();
				}
			}
			//when the radio buttons change via click or keypress
			el.locationContainer.addEventListener("click", function(e){
				LocationChange();
			});
			el.locationContainer.addEventListener("keyup", function(e){
				LocationChange();
			});
			
			//REDIRECT CLICKS TO THE SCROLL CONTAINER TO THE CORRECT ITEM
			//this saves adding an event listener to every item in the chart
			el.scrollContainer.addEventListener("click", function(e){
				//trace the route of the click
				function handleClicks(e) {
					var path = [];
					var node = e.target;
					while(node != el.scrollContainer) {
					   path.push(node);
					   node = node.parentNode;
					}
					return path;
				}

				var clickedElement;
				var clickPath = handleClicks(e);
				for (var i = 0; i < clickPath.length; i++){
					//if it's a grc-scroll-plant, no postfix, it's the right element
					if ( clickPath[i].className.match(/grc-scroll-plant/g) &&
					!clickPath[i].className.match(/grc-scroll-plant-/g) ){
						clickedElement = clickPath[i];
						break;
					}
				}
				PlantClicked(clickedElement);
			});
			
			PlantClicked(el.plantsArray[0]); //load the first plant
			
			//SCROLL LEFT
			el.scrollLeft.addEventListener("click", function(){
				var amount = scrollAmount + settings.plantPercentWidth;
				if (amount <= 0){ //prevent it from going too far left
					SetScroll(amount);
				}
			});
			
			//SCROLL RIGHT
			el.scrollRight.addEventListener("click", function(){
				var amount = scrollAmount - settings.plantPercentWidth;
				//work out furthest right edge
				var maxAmount = -(el.scrollPlants.length * settings.plantPercentWidth);
				//adjust to have the final item hard against the right edge
				var AmountOfLastVisibleItems = 100 / settings.plantPercentWidth;
				maxAmount += settings.plantPercentWidth * AmountOfLastVisibleItems;
				if (amount >= maxAmount){ //prevent it from going too far right
					SetScroll(amount);
				}
			});

			//BUTTON TO ADD/REMOVE PLANTS
			el.chartButton.addEventListener("click", function(){
				var plantID = parseInt(this.getAttribute("data-plant-id"));
				//check to see if the item is in the chart
				var chartLocation = ItemInChart( plantID );
				if (chartLocation>=0){//is in chart
					chartArray.splice(chartLocation, 1);
				}else{
					chartArray.push( plantID );
					chartArray.sort();
				}
				PopulateChart();
				StyleAddRemoveButton();
			});
			
			//BUTTON TO CLEAR CHART
			el.clearButton.addEventListener("click", function(){
				//function used for flipping between the two available texts
				function SwitchText(){
					var existingText = el.clearButton.innerHTML;
					el.clearButton.innerHTML = el.clearButton.getAttribute("data-alternative-text");
					el.clearButton.setAttribute("data-alternative-text", existingText);
				}
				//reset the button to its initial state
				function ResetButton(){
					//return the status to not asked
					el.clearButton.removeAttribute("data-ask-if-sure");
					//switch back tot he original text
					SwitchText();
				}
				
				//check if user has been asked if they're sure they want to delete the chart
				var sure = el.clearButton.getAttribute("data-ask-if-sure");
				
				if (!sure){
					//set the status to asked
					el.clearButton.setAttribute("data-ask-if-sure", true);
					//change to alternative text
					SwitchText();
					//add a timeout to the button
					el.clearButton.uncertaintyTimeout = setTimeout(function(){
						//reset the button
						ResetButton();
					},3000);
				}else{
					//clear the chart
					chartArray.length = 0;
					PopulateChart();
					//restyle the add/remove
					StyleAddRemoveButton();
					//remove all the 'active' classes from the plant elements
					for ( var i = 0; i < el.plantsArray.length; i++){
						Remove_Class(el.plantsArray[i], "active");
					}
					//reset the button
					ResetButton();
					//kill the uncertainty timer that already exist
					clearTimeout(el.clearButton.uncertaintyTimeout);
				}
				
			});
			
			//makes sure the slider items are positioned correctly
			ResponsiveReaction();
			//empty and format the chart
			PopulateChart();
			
		}//END INIT
		
		//POPULATE THE PLANT MENU
		function PopulatePlants(){
		
			//function used for creating new plant elements
			function CreateElements(imgSrc, plantName, id){
				//.grc-scroll-plant element
				var scrollPlant = document.createElement("DIV");
				scrollPlant.className = "grc-scroll-plant";
				scrollPlant.setAttribute("data-plant-id", id);
				scrollPlant.id = "grc-plant-" + id;
					//add the plant image
					var img = document.createElement("DIV");
						img.className = "grc-scroll-plant-img";
						img.style.cssText = "background-image: url('" + imgSrc + "');";
						scrollPlant.appendChild(img);
					//add the plant title
					var title = document.createElement("DIV");
						title.className = "grc-scroll-plant-title";
						var textNode =  document.createTextNode(plantName);
						title.appendChild(textNode);
						scrollPlant.appendChild(title);
				//insert it into the document, make a note of it in the elements list
				var leftOffset = settings.plantPercentWidth *id;
				scrollPlant.style.cssText = "left:" + leftOffset + "%";
				el.scrollContainer.appendChild(scrollPlant);
				el.plantsArray.push(document.getElementById("grc-plant-" + id));
			}
			
			//go through the plant list and send data to the DOM constructor "CreateElements()"
			for (var i = 0; i < plantData.length; i++){
				(function(){
					var imgSrc = plantData[i].img;
					var plantName = plantData[i].name;
					CreateElements(imgSrc, plantName, i);
				})();
			}
		}
		
		
		//SCROLL THE PLANT MENU
		function SetScroll(amount){
			scrollAmount = amount;
			for (var i = 0; i < el.scrollPlants.length; i++){
				var left = settings.plantPercentWidth * i;
				el.scrollPlants[i].style.left = (left + scrollAmount) + "%";
			}
		}
		
		//WHEN A PLANT IN THE CAROUSEL IS CLICKED
		function PlantClicked(element){
			var plantID = parseInt(element.getAttribute("data-plant-id"));
			var currentlySelected = document.getElementsByClassName("selected");
			for (var i = 0; i < currentlySelected.length; i++){
				Remove_Class(currentlySelected[i], "selected");
			}
			Add_Class(element, 'selected');
			selected = plantID;
			
			el.plantTitle.innerHTML = plantData[plantID].name;
			//populate the buttons with relevant content
			el.chartButton.setAttribute("data-plant-id", plantID);
			StyleAddRemoveButton();
			el.buyButton.href = plantData[plantID].buy_link;
			el.articleButton.innerHTML = plantData[plantID].article_title;
			el.articleButton.href = plantData[plantID].article_link;
		}
		
		//----------------------------------
		//CHART FUNCTIONS
		//----------------------------------
		
		//CLEAR THE CHART
		function ClearChart(){
			el.chart.rows.innerHTML = "";
		}
		
		//POPULATE THE CHART
		function PopulateChart(){
			ClearChart();
			
			//FUNCTIONS TO ADD ROWS AND CELLS
			function AddRow(plantID){
				var row = document.createElement("DIV");
				row.className = "grc-row";
				//ADD CELLS
				for ( var j = 0; j < 13; j++ ){
					var cell = document.createElement("DIV");
					cell.className = "grc-cell";
					row.appendChild(cell);
				}
				var children = row.children;
				children[0].innerHTML = plantData[plantID].name;
				for ( var j = 1; j < 13; j++ ){
					//grab the grow data for the north or south of England
					var locationGrowData;
					if (settings.location == "south"){
						locationGrowData = plantData[plantID].south;
					}else{
						locationGrowData = plantData[plantID].north;
					}
					//output the cell's class based on the grow data
					var monthClass = "grc-symbol-" + locationGrowData[j-1];
					Add_Class(children[j], monthClass);
				}
				el.chart.rows.appendChild(row);
			}
			
			//loop through the chart array
			for ( var i = 0; i < chartArray.length; i++ ){
				AddRow(chartArray[i]);
			}
			
			Remove_Class(el.chart, "grc-empty");
			if (chartArray.length==0){
				Add_Class(el.chart, "grc-empty");
			}
			
		}

		Init();
		
		return global;
	};

	var growChart;
	Page_Ready(function(){
		growChart = GROWCHART();
	});

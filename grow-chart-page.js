//on resize, slider should return to 0

/*-------------------------------------------------------------
SETTINGS
-------------------------------------------------------------*/
	var growchart_settings = {};
	//the 'print chart' URL
	growchart_settings.printURL = "http://polyducks.co.uk/growchart/print-chart.html";

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
		SETTINGS
		--------------------------------------------*/
		var settings = {};
			settings.plantPercentWidth = 20;
		
		/*--------------------------------------------
		VARIABLES
		--------------------------------------------*/
		var el = {};
			el.scrollContainer = document.getElementById("grc-scroll-element-container");
			el.plantsArray = [];
		
		/*--------------------------------------------
		INITIALISE
		--------------------------------------------*/
		function Init(){
			PopulatePlants();
			//event listeners
			function handleClicks(e) {
				var path = [];
				var node = e.target;
				while(node != el.scrollContainer) {
				   path.push(node);
				   node = node.parentNode;
				}
				return path;
			}
			el.scrollContainer.addEventListener("click", function(e){
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
				//console.log(clickedElement); //use this to show the plant
				PlantClicked(clickedElement);
			});
			
		}
		
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
			
			//go through the plant list and send data to the DOM constructor
			for (var i = 0; i < plantData.length; i++){
				(function(){
					var imgSrc = plantData[i].img;
					var plantName = plantData[i].name;
					CreateElements(imgSrc, plantName, i);
				})();
			}
		}
		
		function PlantClicked(element){
			if (Find_Class(element, 'active')){
				Remove_Class(element, 'active');
			}else{
				Add_Class(element, 'active');
			}
		}

		Init();
		
		return global;
	};

	var growChart;
	Page_Ready(function(){
		growChart = GROWCHART();
	});

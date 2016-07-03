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
			settings.location = "north"; //or south
		
		/*--------------------------------------------
		VARIABLES
		--------------------------------------------*/
		
		var el = {};
			el.error = document.getElementById("grc-error");
			el.errorInfo = document.getElementById("grc-error-info");
			el.output = document.getElementById("grc-output");
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
		
		/*--------------------------------------------
		INITIALISE
		--------------------------------------------*/
		function Init(){
			//scan URL for data
			var URL = window.location.href;

			//get data from URL
			var plantList = /\?.*val=((\d+\&?)+)/g.exec(URL);
			var UKLocation = /\?.*n=(\d)/g.exec(URL);

			if (plantList && UKLocation){			
				chartArray = plantList[1].split("&");
				for (x in chartArray){
					chartArray[x] = parseInt(chartArray[x]);
				}

				var isNorth = UKLocation[1];
				if (isNorth == "1"){
					settings.location = "north";
				}else{
					settings.location = "south";
				}
				
				//display the chart
				PopulateChart();
				
			}else{ //if there's an error with the URL, say so
				var errorMsg = "";
				if (!plantList){
					errorMsg = "there were no plants to put into the plant list";
				}
				if (!plantList && !UKLocation){
					errorMsg += " and ";
				}
				if (!UKLocation){
					errorMsg += "there was no north/south preference";
				}
				el.errorInfo.innerHTML = errorMsg + " in your request.";
				
				Remove_Class(el.error, "grc-hidden");
				Add_Class(el.output, "grc-hidden");
				
			}
			
		}//END INIT
		
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

/* 
	KEY
	---+---------------
	NO | nothing
	SI | sow indoors
	SC | sow under cloche
	SO | sow outdoors
	PI | plant indoors
	PO | plant outdoors
	HR | harvest
*/

var plantData = [
	{
		"name" 			: "Aubergine",
		"img"			: "http://i1.adis.ws/i/wgc/veg000",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Basil",
		"img"			: "http://i1.adis.ws/i/wgc/veg001",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Beetroot",
		"img"			: "http://i1.adis.ws/i/wgc/veg002",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Broccoli",
		"img"			: "http://i1.adis.ws/i/wgc/veg003",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	},
	{
		"name" 			: "Last Cabbage",
		"img"			: "http://i1.adis.ws/i/wgc/veg004",
		"buy_link"		: "www.google.co.uk",
		"article_title" : "Grow Aubergine for fun and profit",
		"article_link" 	: "www.google.co.uk",
		"north"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		],
		"south"			: [
			//_____________________________________________________________________
			//JAN   FEB   MAR   APR   MAY   JUN   JUL   AUG   SEP   OCT   NOV   DEC
			 "SI", "SI", "SI", "NO", "NO", "PO", "PO", "NO", "HR", "HR", "NO", "NO"
		]
	}
];
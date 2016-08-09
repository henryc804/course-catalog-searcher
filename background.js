// ok so there are 3 parts here
// first: figure out how to structure all the code so I'm able to an alert whenever I select something that is a number
// second: figure out how to go to the course catalog site and plug it all in, then extract necessary information
// third: figure out how add all extracted information to popup.html and display it




chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
	    var thing = getHTML(request.number);
		sendResponse({text: "it worked...sigh", sel: request.number, display: thing});
	}
);

populatePopup = function(listOfElements) {
	var tags = listOfElements[0];

	// do stuff?

	var windowOfPopup = openPopup();

	windowOfPopup.onload = function() {
		var s = new XMLSerializer();
		var str = s.serializeToString(tags);

		var element = windowOfPopup.document.getElementById("parent");
		// element.innerHTML = str;
		element.appendChild(tags);
	};

	// var popups = chrome.extension.getViews({type: "popup"});

	// var element = document.getElementById("parent");
	// element.appendChild(tags);

	// openPopup();
}

openPopup = function() {
	var windowOfPopup = window.open("popup.html", "extension_popup", "width=300,height=400,status=no,scrollbars=yes,resizable=no");
	return windowOfPopup;
}


getHTML = function(courseNumber) {
	var url = "http://student.mit.edu/catalog/search.cgi?search=" + courseNumber + "&style=verbatim&when=*&termleng=4&days_offered=*&start_time=*&duration=*&total_units=*";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		// console.log(this.responseXML);
		// this.responseXML;
		populatePopup(this.responseXML.getElementsByTagName("blockquote"));


		// ok so now I have the responseXML...
		// so now Ii can take all of that and figure out how to extract that information

		// pass responseXML to a function that extracts the necessary data and replaces popup.html with it
		// then it calls window.open on the popup to open it
	};
	xhr.responseType = "document";
	xhr.send();
};
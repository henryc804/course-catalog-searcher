chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
	    getHTML(request.number, request.centerPopupValues);
	}
);

var windowOfPopup;
populatePopup = function(listOfElements, centerPopupValues) {
	var tags = listOfElements[0];

	var numberOfFirstTagsToRemove = 7;
	for (var x = 0; x < numberOfFirstTagsToRemove; x++) {
		tags.removeChild(tags.childNodes[0]);
	}

	// should also remove all things that come after the first h3 probably
	// so probably just like, if you hit the second h3, remove everything after it
	// just find the index value of the first h3, and then do a while loop until the length is less than that index value

	windowOfPopup = openPopup(centerPopupValues);

	windowOfPopup.onload = function() {
		var element = windowOfPopup.document.getElementById("parent");
		
		// var s = new XMLSerializer();
		// var str = s.serializeToString(tags);
		// element.innerHTML = str;

		//using appendChild because it is more efficient than innerHTML setting
		element.appendChild(tags);

		windowOfPopup.focus();
	};
};

openPopup = function(centerPopupValues) {
	var windowOfPopup = window.open("popup.html", "extension_popup", "width="+centerPopupValues.width+",height="+centerPopupValues.height+","+'top='+centerPopupValues.top+',left='+centerPopupValues.left+",status=no,scrollbars=yes,resizable=no");
	return windowOfPopup;
};

var url;
getHTML = function(courseNumber, centerPopupValues) {
	url = "http://student.mit.edu/catalog/search.cgi?search=" + courseNumber + "&style=verbatim&when=*&termleng=4&days_offered=*&start_time=*&duration=*&total_units=*";
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onload = function() {
		var listOfElements = this.responseXML.getElementsByTagName("blockquote");
		if (listOfElements[0].getElementsByTagName("H3").length !== 0) {
			populatePopup(listOfElements, centerPopupValues);
		}
	};
	xhr.responseType = "document";
	xhr.send();
};

getURL = function() {
	windowOfPopup.close();
	return url;
};
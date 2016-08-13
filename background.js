chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
	    getHTML(request.number, request.centerPopupValues);
	}
);


var windowOfPopup;
populatePopup = function(listOfElements, centerPopupValues) {
	var tags = listOfElements[0];

	while (tags.childNodes[0].nodeName !== "H3") {
		tags.removeChild(tags.childNodes[0]);
	}

	var hrefsToChange = tags.getElementsByTagName("a");
	for (var x = 0; x < hrefsToChange.length; x++) {
		tags.getElementsByTagName("a")[x].setAttribute("href", tags.getElementsByTagName("a")[x].href);
	}

	if (windowOfPopup != null) {
		windowOfPopup.close();
	}
    windowOfPopup = openPopup(centerPopupValues);
    windowOfPopup.onload = function() {
        var element = windowOfPopup.document.getElementById("parent");
        element.appendChild(tags);
        windowOfPopup.focus();
    };
    windowOfPopup.onbeforeunload = function(e) {
        windowOfPopup = null;
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
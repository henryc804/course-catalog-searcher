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
	var regExp = /PopUpHelp\('(.+)'\);$/;
	for (var x = 0; x < hrefsToChange.length; x++) {
		tags.getElementsByTagName("a")[x].setAttribute("href", hrefsToChange[x].href);
		var match = regExp.exec(tags.getElementsByTagName("a")[x].href);
		if (match != null) {
			tags.getElementsByTagName("a")[x].setAttribute("href", match[1]);
		}
	}

	var imgsToChange = tags.getElementsByTagName("img");
	for (var x = 0; x < imgsToChange.length; x++) {
		tags.getElementsByTagName("img")[x].setAttribute("src", imgsToChange[x].src);
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
var courseEvalURL;
var courseNumberWithoutJ;
var hknURL;
getHTML = function(courseNumber, centerPopupValues) {
	url = "http://student.mit.edu/catalog/search.cgi?search=" + courseNumber + "&style=verbatim&when=*&termleng=4&days_offered=*&start_time=*&duration=*&total_units=*";
	if (courseNumber.slice(-1) === "J") {
		courseNumberWithoutJ = courseNumber.slice(0,-1);
	} else {
		courseNumberWithoutJ = courseNumber;
	}
	courseEvalURL = "https://edu-apps.mit.edu/ose-rpt/subjectEvaluationSearch.htm?termId=&departmentId=&subjectCode=" + courseNumberWithoutJ + "&instructorName=&search=Search";
	if (courseNumber.slice(0,1) === "6") {
		hknURL = "https://underground-guide.mit.edu/search?q=" + courseNumber;
	} else {
		hknURL = null;
	}

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
getCourseURL = function() {
	windowOfPopup.close();
	return courseEvalURL;
};
gethknURL = function() {
	windowOfPopup.close();
	return hknURL;
};
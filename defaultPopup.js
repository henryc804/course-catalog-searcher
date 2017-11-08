document.addEventListener('DOMContentLoaded', function() {
  var navigateButton = document.getElementById('goToCourseCatalog');
  navigateButton.addEventListener('click', function() {
    var createProperties = {
      url: "http://student.mit.edu/catalog/extsearch.cgi",
      active: true
    };

    chrome.tabs.create(createProperties);

  });

});

document.addEventListener('DOMContentLoaded', function() {
  var navigateButton = document.getElementById('Submit');
  navigateButton.addEventListener('click', function() {
    var createProperties = {
      url: "http://student.mit.edu/catalog/extsearch.cgi",
      active: true
    };

    searchCourseNumber();

  });

});


document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('courseNumberTextBox').onkeypress = function(event){
	    if (event.keyCode == 13) {
		    document.getElementById('Submit').click();
	    }
	};
});


window.onload = function() {
    document.getElementById("courseNumberTextBox").focus();   
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("courseNumberTextBox").focus();
}, false);

searchCourseNumber = function() {
	var textboxInput = document.getElementById("courseNumberTextBox").value;
	textboxInput = textboxInput.trim();
	textboxInput = textboxInput.replace("[", "");
	textboxInput = textboxInput.replace("]", "");
	if (textboxInput.length && textboxInput.length < 10 && textboxInput.search(/^\w{1,3}\.\w{2,5}$/) !== -1) {
		getHTML(textboxInput);
	}
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
			populatePopup(listOfElements);
		}
	};
	xhr.responseType = "document";
	xhr.send();
};

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

    var element = document.getElementById("parent");
    while (element.childNodes.length !== 0) {
    	element.removeChild(element.childNodes[0]);
    }

    element.appendChild(document.createElement("br"));
    element.appendChild(document.createElement("hr"));
    addButtons(element);
    element.appendChild(tags);

    document.getElementById("body").style.width = "500px";
    document.getElementById("body").style.height = "400px";
    document.getElementsByTagName("blockquote")[0].style.marginLeft = "-1px";
};


getURL = function() {
	return url;
};
getCourseURL = function() {
	return courseEvalURL;
};
gethknURL = function() {
	return hknURL;
};

addButtons = function(element) {
    var button = document.createElement("BUTTON");
    button.id = 'goToURL';
    var text = document.createTextNode("Course Catalog");
    button.appendChild(text);
    element.appendChild(button);

	var button = document.createElement("BUTTON");
    button.id = 'goToCourseEval';
    var text = document.createTextNode("Course Evaluation");
    button.appendChild(text);
    element.appendChild(button);

    var navigateButton = document.getElementById('goToURL');
    navigateButton.addEventListener('click', function() {
        var createProperties = {
            url: getURL(),
            active: true
        };

        chrome.tabs.create(createProperties);
    });
    var navigateButton = document.getElementById('goToCourseEval');
    navigateButton.addEventListener('click', function() {
        var createProperties = {
            url: getCourseURL(),
            active: true
        };

        chrome.tabs.create(createProperties);
    });

    var hknURL = gethknURL();
    if (hknURL != null) {
    	var button = document.createElement("BUTTON");
        button.id = 'goToHKN';
        var text = document.createTextNode("check it out on HKN");
        button.appendChild(text);
        element.appendChild(button);

        var navigateButton = document.getElementById('goToHKN');
        navigateButton.addEventListener('click', function() {
            var createProperties = {
                url: hknURL,
                active: true
            };
            chrome.tabs.create(createProperties);
        });
    }

};
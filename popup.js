document.addEventListener('DOMContentLoaded', function() {
  var navigateButton = document.getElementById('goToURL');
  navigateButton.addEventListener('click', function() {
    var createProperties = {
      url: chrome.extension.getBackgroundPage().getURL(),
      active: true
    };

    chrome.tabs.create(createProperties);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var navigateButton = document.getElementById('goToCourseEval');
  navigateButton.addEventListener('click', function() {
    var createProperties = {
      url: chrome.extension.getBackgroundPage().getCourseURL(),
      active: true
    };

    chrome.tabs.create(createProperties);
  });
});

var hknURL = chrome.extension.getBackgroundPage().hashknURL();
if (hknURL !== null) {
  document.addEventListener('DOMContentLoaded', function() {
    var button = document.createElement("BUTTON");
    button.id = 'goToHKN';
    var text = document.createTextNode("check it out on HKN");
    button.appendChild(text);
    document.getElementById('buttonGroup').appendChild(button);

    var navigateButton = document.getElementById('goToHKN');
    navigateButton.addEventListener('click', function() {
      var createProperties = {
          url: chrome.extension.getBackgroundPage().gethknURL(),
          active: true
      };
      chrome.tabs.create(createProperties);
    });

  });
}
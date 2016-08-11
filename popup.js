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
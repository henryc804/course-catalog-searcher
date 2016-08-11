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
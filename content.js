var lastHighlightedText = "";

document.addEventListener('mouseup', function(event){
	var text = window.getSelection().toString();
	if (lastHighlightedText != text) {
		lastHighlightedText = text;
		text = text.trim();
		text = text.replace("[", "");
		text = text.replace("]", "");
		if (text.length && text.length < 10 && text.search(/^\w{1,3}\.\w{2,5}$/) !== -1) {
			var values = centerPopupValues();
			chrome.runtime.sendMessage({'number': text, 'centerPopupValues': values}, function(response) {
			});
		}
	}
});

document.addEventListener('keyup', function(event){
	if (event.keyCode >= 35 && event.keyCode <= 40) {
		var text = window.getSelection().toString();
		if (lastHighlightedText != text) {
			lastHighlightedText = text;
			text = text.trim();
			text = text.replace("[", "");
			text = text.replace("]", "");
			if (text.length && text.length < 10 && text.search(/^\w{1,3}\.\w{2,5}$/) !== -1) {
				var values = centerPopupValues();
				chrome.runtime.sendMessage({'number': text, 'centerPopupValues': values}, function(response) {
				});
			}
		}
	}
});

centerPopupValues = function() {
	var widthOfPopup = 500;
	var heightOfPopup = 450;

	var dualScreenLeft = window.screenLeft;
	var dualScreenTop = window.screenTop;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (widthOfPopup / 2)) + dualScreenLeft;
    var top = ((height / 2) - (heightOfPopup / 2)) + dualScreenTop;

    return {'left': left, 'top': top, 'width': widthOfPopup, 'height': heightOfPopup};
};
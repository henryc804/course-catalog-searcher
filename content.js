// also add 'onkeyup'
document.addEventListener('mouseup', function(event){
	var text = window.getSelection().toString();
	if (text.length && !isNaN(text)) {
		chrome.runtime.sendMessage({'number': text}, function(response) {
			alert(response.text);
			alert(response.sel);
			alert(response.thing);
		});
		// chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
	}

	else {
		alert("meh: " + (typeof text));
	}

});

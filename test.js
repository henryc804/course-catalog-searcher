xhr = new XMLHttpRequest();
xhr.open("GET", "http://student.mit.edu/catalog/search.cgi?search=6.01&style=verbatim&when=*&termleng=4&days_offered=*&start_time=*&duration=*&total_units=*", true);
xhr.onreadystatechange = function() {
	if (xhr.readyState == 4) {
		var resp = JSON.parse(xhr.responseText);
		console.log(resp);
  	}
};
xhr.send();
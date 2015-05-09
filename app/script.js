// get text that is inside the teleprompter div
scroller(document.getElementById("teleprompter"));

function GetObjX (obj) {
	var rect = obj.getBoundingClientRect();
	var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;	
	return(rect.left + scrollLeft);
}

function GetObjY (obj) {
	var rect = obj.getBoundingClientRect();
	var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;	
	return(rect.top + scrollTop);
}



function scroller(obj) {

	var isScrolling = 0,
		step = 1,
		minStep = 0,
		ms = 60,
		timerID = 0;

	var startScrolling = function() {
		isScrolling = 1;

		var newTop = parseInt(GetObjY(obj), 10) - step;
		newTop+="px";
		obj.style.top = newTop;

		timerID =window.setTimeout(startScrolling, ms);
	};

	var stopScrolling = function() {

		isScrolling = 0;

		window.clearTimeout(timerID);
		
	};


	var startOrStop = function() {

		if(isScrolling) {
			stopScrolling();
		} else {
			startScrolling();
		}
	};

	var userInput = function(keyPress) {
		if (!keyPress) keyPress = event;			

		switch (keyPress.keyCode) {
			case 10: // Return
			case 13: // Enter
				startOrStop();
			break;
			case 39: // Right arrow: accelerate the stepping
				step++;
			break;
			case 37: // Left arrow: decelerate the stepping
				if(step > minStep) step--;
			break;			
			default:
				// alert(keyPress.keyCode);
				break;
		}

		return false;
	};


	obj.onclick = startOrStop;
	document.onkeyup = userInput;
};
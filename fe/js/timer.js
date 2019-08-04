/*
	This function sets the timer to 15 mins for every 10 questions.
	For testing it is set to a max of 3 mins, as numQuestions is fixed to 2.
	numQuestions variable will be set by the user in the final app version
*/

function initTimer() {
	document.querySelector(".nav").style.display = 'block';

	var e = document.getElementById("numMaxQuestions");
	var numQuestions = e.options[e.selectedIndex].text;
	var examTime = ((numQuestions * 90) / 60);
	var minStart = 00;

	// If number of questions is odd, then set number of seconds to 30
	// and take .5 from minutes, this makes it an even number.
	if (numQuestions%2 != 0) {
		minStart = 30;
		examTime = examTime - 0.5;
	}

	document.getElementById('timer').innerHTML = examTime + ":" + minStart;
	startTimer();
}

function startTimer(timer) {
	var presentTime = document.getElementById('timer').innerHTML;
	var timeArray = presentTime.split(/[:]+/);
	var m = timeArray[0];
	var s = checkSecond((timeArray[1] - 1));

	// reduces the timer by one minute if seconds is less than 60
	if ( s == 59) {
		m = m - 1
	};
	
	if ( m < 5 ) {
		document.getElementById('timer').style.color = "red";
	}
	
	// If minutes run out, timer stops,
	// at present it generates an alert,
	// but will complete the exam once coding finished.
	if ( m < 0 ) {
		clearTimeout(presentTime);
		document.getElementById('timer').innerHTML = "Expired";

		var x = document.createEvent("MouseEvent");
		x.initMouseEvent("click", true);
		document.getElementById("btn-SummaryEndExam").dispatchEvent(x);

	}

	document.getElementById('timer').innerHTML = m + ":" + s;
	setTimeout(startTimer, 1000);
}

// Adds a zero before the number of seconds if less than 10
function checkSecond(sec) {
	if (sec < 10 && sec >= 0) {
		sec = "0" + sec
	}; // add zero in front of numbers < 10

	if (sec < 0) {
		sec = "59"
	};

	return sec;
}



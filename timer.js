var totSeconds = 0;
var timerInterval;

function changeTimer() {
	var backup = totSeconds;
	if(totSeconds >= 0) {
		var seconds = totSeconds % 60;
		totSeconds -= totSeconds % 60;
		totSeconds /= 60;
		var minutes = totSeconds % 60;
		totSeconds -= totSeconds % 60;
		totSeconds /= 60;
		var hours = totSeconds;
		var hoursString = hours.toString();
		var minutesString = minutes.toString();
		var secondsString = seconds.toString();
		if(hoursString.length === 1) hoursString = "0" + hoursString;
		if(minutesString.length === 1) minutesString = "0" + minutesString;
		if(secondsString.length === 1) secondsString = "0" + secondsString;
		var timeToDisplay = hoursString + ":" + minutesString + ":" + secondsString;
		document.getElementById("timeLeft").innerText = timeToDisplay;
		backup--;
		totSeconds = backup;
	} else {
		clearInterval(timerInterval);
		document.getElementById("timesUp").load();
		document.getElementById("timesUp").play();
		document.getElementById("startpause").style.display = "none";
	}
}

function pauseTimer() {
	clearInterval(timerInterval);
	document.getElementById("startpause").onclick = resumeTimer;
	document.getElementById("startpause").innerText = "Resume timer";
}

function resumeTimer() {
	timerInterval = setInterval(changeTimer, 1000);
	document.getElementById("startpause").onclick = pauseTimer;
	document.getElementById("startpause").innerText = "Pause timer";
}

function startTimer() {
	var hours = document.getElementById("hour").value;
	var minutes = document.getElementById("minute").value;
	var seconds = document.getElementById("second").value;
	if(0 <= hours && hours <= 99 && 0 <= minutes && minutes <= 99 && 0 <= seconds && seconds <= 99) {
		document.getElementById("startpause").onclick = pauseTimer;
		document.getElementById("startpause").innerText = "Pause timer";
		hours = Number(hours);
		minutes = Number(minutes);
		seconds = Number(seconds);
		totSeconds = 3600 * hours + 60 * minutes + seconds;
		changeTimer();
		timerInterval = setInterval(changeTimer, 1000);

	} else {
		alert("Invalid time! You can have at most 99 hours, 99 minutes and 99 seconds!");
	}
}

function resetTimer() {
	document.getElementById("timesUp").pause();
	clearInterval(timerInterval);
	document.getElementById("startpause").style.display = "inline";
	document.getElementById("startpause").onclick = startTimer;
	document.getElementById("startpause").innerText = "Start timer";
	var hours = document.getElementById("hour").value;
	var minutes = document.getElementById("minute").value;
	var seconds = document.getElementById("second").value;
	hours = Number(hours);
	minutes = Number(minutes);
	seconds = Number(seconds);
	totSeconds = 3600 * hours + 60 * minutes + seconds;
	changeTimer();
}

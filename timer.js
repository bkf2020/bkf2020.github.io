var totSeconds = 0;
var timerInterval;
var timeLeftInMilliseconds;
var endTime;

function changeTimerToTotSeconds() {
	var backup = totSeconds;
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
	document.title = timeToDisplay + " -- Be kind for 2020 (bkf2020)'s Timer";
	totSeconds = backup;
}

function updateTotSeconds() {
	timeLeftInMilliseconds = endTime - Date.now();
	totSeconds = Math.ceil(timeLeftInMilliseconds / 1000);
	if(totSeconds >= 0) {
		changeTimerToTotSeconds();
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
	endTime = Date.now() + timeLeftInMilliseconds;
	timerInterval = setInterval(updateTotSeconds, 100);
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
		timeLeftInMilliseconds = totSeconds * 1000;
		endTime = Date.now() + timeLeftInMilliseconds;
		changeTimerToTotSeconds();
		timerInterval = setInterval(updateTotSeconds, 100);

	} else {
		var message = "Invalid time! You can have at least 0 hours,";
		message += " 0 mintues, and 0 seconds and at most 99 hours,";
		message += " 99 minutes and 99 seconds!";
		alert(message);
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
	changeTimerToTotSeconds();
	document.title = "Be kind for 2020 (bkf2020)'s Timer";
}

var totSeconds = 0;
var timerInterval;

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
	totSeconds = backup;
}

function updateTotSeconds() {
	if(totSeconds > 0) {
		totSeconds--;
		changeTimerToTotSeconds();
	} else {
		clearInterval(timerInterval);
		document.getElementById("timesUp").load();
		document.getElementById("timesUp").play();
		document.getElementById("startpause").onclick = stopWorking;
		document.getElementById("startpause").innerText = "Continue";
	}
}

function stopWorking() {
	document.getElementById("timesUp").pause();
	var message = "Enter: 'I sincerely promise that I finished the task' if you finished.\n";
	message += "Otherwise, type anything else.";
	var response = window.prompt(message);
	if(response === "I sincerely promise that I finished the task") {
		clearInterval(timerInterval);
		document.getElementById("startpause").style.display = "inline";
		document.getElementById("startpause").onclick = startWorking;
		document.getElementById("startpause").innerText = "Start working";
		var hours = document.getElementById("hour").value;
		var minutes = document.getElementById("minute").value;
		var seconds = document.getElementById("second").value;
		hours = Number(hours);
		minutes = Number(minutes);
		seconds = Number(seconds);
		totSeconds = 3600 * hours + 60 * minutes + seconds;
		changeTimerToTotSeconds();
	} else if(totSeconds <= 0) {
		message = "Choose one of the following punishments:\n";
		message += "- Do burpees for one minute\n";
		message += "- Do 30 pushups\n";
		message += "- Run 1 mile\n";
		message += "- Explain to someone why you didn't finish the task\n";
		message += "- Take a cold shower\n";
		message += "- Put hot sauce in your water bottle\n\n";
		message += "Enter: 'I sincerely promise that I finished the punishment' to continue.\n";
		response = window.prompt(message);
		while(response !== "I sincerely promise that I finished the punishment") {
			response = window.prompt(message);
		}
		document.getElementById("startpause").style.display = "inline";
		document.getElementById("startpause").onclick = startWorking;
		document.getElementById("startpause").innerText = "Start working";
		var hours = document.getElementById("hour").value;
		var minutes = document.getElementById("minute").value;
		var seconds = document.getElementById("second").value;
		hours = Number(hours);
		minutes = Number(minutes);
		seconds = Number(seconds);
		totSeconds = 3600 * hours + 60 * minutes + seconds;
		changeTimerToTotSeconds();
	}
}

function startWorking() {
	var hours = document.getElementById("hour").value;
	var minutes = document.getElementById("minute").value;
	var seconds = document.getElementById("second").value;
	if(0 <= hours && hours <= 99 && 0 <= minutes && minutes <= 99 && 0 <= seconds && seconds <= 99) {
		document.getElementById("startpause").onclick = stopWorking;
		document.getElementById("startpause").innerText = "Stop working";
		document.getElementById("taskName").innerText = document.getElementById("tname").value;
		hours = Number(hours);
		minutes = Number(minutes);
		seconds = Number(seconds);
		totSeconds = 3600 * hours + 60 * minutes + seconds;
		changeTimerToTotSeconds();
		timerInterval = setInterval(updateTotSeconds, 1000);

	} else {
		var message = "Invalid time! You can have at least 0 hours,";
		message += " 0 mintues, and 0 seconds and at most 99 hours,";
		message += " 99 minutes and 99 seconds!";
		alert(message);
	}
}

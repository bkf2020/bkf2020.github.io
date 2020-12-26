var answers = new Array(25), 
    tot = 25;
var wrong = [];

function getCheckedValue( radioName ){
    var radios = document.getElementsByName( radioName ); // Get radio group by-name
    for(var y=0; y<radios.length; y++)
		if(radios[y].checked) return radios[y].value; // return the checked value
}

function getAnswers() {
	for (var i=0; i<tot; i++)
		answers[i] = getCheckedValue("answer"+i);
}

function getScore(){
	getAnswers();
	var score = 0.0;
	for (var i=0; i<tot; i++)
		if(getCheckedValue("question"+i)==="Blank") score += 1.5;
		else if(getCheckedValue("question"+i)===answers[i]) score += 6; // increment only
		else wrong.push(i + 1); // wrong answer
	return score;
}

function getWrong() {
	var wrongreturn = "";
	for(var i=0; i<wrong.length; i++)
		if(i != wrong.length - 1) wrongreturn = wrongreturn.concat(wrong[i], ", ");
		else wrongreturn = wrongreturn.concat(wrong[i]);
	wrong = [];
	return wrongreturn;
}

function returnScore(){
	document.getElementById("finalscore").innerHTML = "Final score: " + getScore();
	document.getElementById("wronganswers").innerHTML = "Questions you got wrong: " + getWrong();
}

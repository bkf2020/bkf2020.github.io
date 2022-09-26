var flashcardsArr = [];
var flashcards = [], flashcards_def = [], flashcards_term = [];

function resetVariables() {
    flashcardsArr = [];
    flashcards = [], flashcards_def = [], flashcards_term = [];
}

function generateFlashcards() {
    resetVariables();
    var flashcards = document.getElementById("flashcards").value;
    var regex = new RegExp(document.getElementById("regex").value);
    flashcardsArr = flashcards.split(regex);
    document.getElementById("flashcardsDiv").style = "display: inherit;";

    var table = document.getElementById("flashcardsTable");
    var empty = document.createElement("table");
    empty.id = "flashcardsTable";
    empty.style = "font-size: small;";
    table.parentNode.replaceChild(empty, table);
    table = document.getElementById("flashcardsTable");

    var header = table.createTHead();
    var firstRow = header.insertRow(-1);
    var termText = firstRow.insertCell(0), defText = firstRow.insertCell(1);
    termText.innerHTML = "<b>Term</b>";
    defText.innerHTML = "<b>Definition</b>";

    var trim = document.getElementById("yesRadio").checked;

    for(var i = 0; i < flashcardsArr.length; i += 2) {
        if(trim) {
            flashcardsArr[i] = flashcardsArr[i].trim();
            flashcardsArr[i + 1] = flashcardsArr[i + 1].trim();
        }
        flashcards_term.push([flashcardsArr[i], flashcardsArr[i + 1]]);
        flashcards_def.push([flashcardsArr[i + 1], flashcardsArr[i]]);
        var row = table.insertRow(-1);
        var term = row.insertCell(0);
        var def = row.insertCell(1);
        term.innerText = flashcardsArr[i];
        def.innerText = flashcardsArr[i + 1];
    }
}

function startQuiz() {
    generateFlashcards();
    if(document.getElementById("termRadio").checked) {
        flashcards = flashcards_def;
    } else {
        flashcards = flashcards_term;
    }
    document.getElementById("numCorrect").style = "display: none;";
    document.getElementById("totalQuestions").style = "display: none;";

    var quizList = document.getElementById("quizList");
    var empty = document.createElement("ol");
    empty.id = "quizList";
    quizList.parentNode.replaceChild(empty, quizList);
    quizList = document.getElementById("quizList");

    document.getElementById("quizDiv").style = "display: inherit;";
    for(var cnt = 0; cnt < flashcards.length; cnt++) {
        var i = Math.floor(flashcards.length * Math.random());
        var j = Math.floor(flashcards.length * Math.random());
        var a = flashcards[i], b = flashcards[j];
        flashcards[i] = b;
        flashcards[j] = a;
    }
    for(var i = 0; i < flashcards.length; i++) {
        var listElement = document.createElement("li");
        var questionText = document.createElement("span");
        questionText.id = "question" + i.toString();
        questionText.innerText = flashcards[i][0];
        var blankSpace = document.createElement("br");
        var inputSpace = document.createElement("input");
        inputSpace.type = "text";
        inputSpace.id = "userAnswer" + i.toString();
        inputSpace.name = "userAnswer" + i.toString();
        var userAnswerInfo = document.createElement("p");
        userAnswerInfo.id = "userAnswerInfo" + i.toString();
        listElement.appendChild(questionText);
        listElement.appendChild(blankSpace);
        listElement.appendChild(inputSpace);
        listElement.appendChild(userAnswerInfo);
        quizList.appendChild(listElement);
    }
}

function checkQuiz() {
    if(!confirm('Are you sure you want to submit?')) {
        return;
    }
    var numCorrect = 0;
    for(var i = 0; i < flashcards.length; i++) {
        var userAnswer = document.getElementById("userAnswer" + i.toString()).value;
        var correctAnswer = flashcards[i][1];
        var isCorrect = document.createElement("span");
        if(userAnswer === correctAnswer) {
            isCorrect.innerText = " (Correct!)";
            isCorrect.style = "color: springgreen; font-weight: bold;";
            numCorrect++;
        } else {
            isCorrect.innerText = " (Wrong!)";
            isCorrect.style = "color: tomato; font-weight: bold;";
        }
        
        var userAnswerText = document.createElement("b");
        userAnswerText.innerText = "Your answer: ";
        var userAnswerDisplay = document.createElement("span");
        userAnswerDisplay.innerText = userAnswer;
        userAnswerDisplay.style = "color: pink;";
        userAnswerDisplay.id = "userAnswerDisplay" + i.toString();
        var correctAnswerText = document.createElement("b");
        correctAnswerText.innerText = "; Correct answer: ";
        var correctAnswerDisplay = document.createElement("span");
        correctAnswerDisplay.innerText = correctAnswer;
        correctAnswerDisplay.style = "color: lightblue;";
        correctAnswerDisplay.id = "correctAnswerDisplay" + i.toString();
        var diffText = document.createElement("b");
        diffText.innerText = "; Diff: ";
        var diffDisplay = document.createElement("span");
        diffDisplay.id = "diffDisplay" + i.toString()
        
        var userAnswerInfo = document.getElementById("userAnswerInfo" + i.toString());
        userAnswerInfo.appendChild(userAnswerText);
        userAnswerInfo.appendChild(userAnswerDisplay);
        userAnswerInfo.appendChild(correctAnswerText);
        userAnswerInfo.appendChild(correctAnswerDisplay);
        userAnswerInfo.appendChild(diffText);
        userAnswerInfo.appendChild(diffDisplay);

        document.getElementById("question" + i.toString()).appendChild(isCorrect);
        document.getElementById("numCorrect").innerText = "Number Correct: " + numCorrect.toString();
        document.getElementById("numCorrect").style = "color: springgreen; font-weight: bold; font-size: x-large; display: inherit;";
        document.getElementById("totalQuestions").innerText = "Total Questions: " + flashcards.length.toString();
        document.getElementById("totalQuestions").style = "color: lightblue; font-weight: bold; font-size: x-large; display: inherit;";
    }
}
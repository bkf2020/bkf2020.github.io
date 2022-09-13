var flashcardsArr = [], groups = [];
var flashcards = [], flashcards_def = [], flashcards_term = [];
var groupIndex = 0, totGroups = 0, flashcardsIndex = 0;

function resetVariables() {
    flashcardsArr = [], groups = [];
    flashcards = [], flashcards_def = [], flashcards_term = [];
    groupIndex = 0, totGroups = 0, flashcardsIndex = 0;
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

function createQuestion() {
    var list = document.getElementById("termsCurrGroup");
    var newList = document.createElement("ul");
    for(var i = 0; i < groups[groupIndex].length; i++) {
        var newItem = document.createElement("li");
        newItem.innerText = flashcards[groups[groupIndex][i]][0];
        newList.appendChild(newItem);
    }
    newList.id = "termsCurrGroup";
    list.parentNode.replaceChild(newList, list);

    document.getElementById("currGroup").innerText = groupIndex + 1;
    document.getElementById("answersDiv").style = "display: none;";
    flashcardsIndex = groups[groupIndex][Math.floor(Math.random() * groups[groupIndex].length)];
    document.getElementById("question").innerText = flashcards[flashcardsIndex][0];
    document.getElementById("checkOrMove").innerText = "Submit (or select the text field and press enter!)";
    document.getElementById("checkOrMove").onclick = checkQuestion;
}

function checkQuestion() {
    var userAnswer = document.getElementById("answer").value;
    var correctAnswer = flashcards[flashcardsIndex][1];
    if(userAnswer === correctAnswer) {
        document.getElementById("verdict").style = "color: springgreen;";
        document.getElementById("verdict").innerText = "Correct!";
    } else {
        document.getElementById("verdict").style = "color: tomato;";
        document.getElementById("verdict").innerText = "Incorrect!";
    }
    document.getElementById("answer").value = "";
    document.getElementById("answersDiv").style = "display: inherit;";
    document.getElementById("userAnswer").innerText = userAnswer;
    document.getElementById("correctAnswer").innerText = correctAnswer;
    document.getElementById("checkOrMove").innerText = "Continue (or select the text field and press enter!)";
    document.getElementById("checkOrMove").onclick = createQuestion;
}

function startQuiz() {
    generateFlashcards();
    totGroups = parseInt(document.getElementById("numberGroups").value);
    if(document.getElementById("termRadio").checked) {
        flashcards = flashcards_def;
    } else {
        flashcards = flashcards_term;
    }
    document.getElementById("quizDiv").style = "display: inherit; text-align: center;";
    var numElements = flashcards.length, usualAdd = Math.ceil(numElements / totGroups), l = 0;
    for(var i = 0; i < totGroups; i++) {
        var currGroup = [];
        if(numElements >= usualAdd) {
            for(var j = l; j < l + usualAdd; j++) {
                currGroup.push(j);
            }
            l += usualAdd;
            numElements -= usualAdd;
        } else {
            for(var j = l; j < l + numElements; j++) {
                currGroup.push(j);
            }
            l += numElements;
            numElements = 0;
        }
        groups.push(currGroup);
    }
    document.getElementById("totGroup").innerText = totGroups;
    document.getElementById("currGroup").innerText = groupIndex + 1;
    createQuestion();
}

function nextGroup() {
    if(groupIndex < totGroups - 1)  {
        groupIndex++;
        createQuestion();
    }
}

function prevGroup() {
    if(groupIndex > 0)  {
        groupIndex--;
        createQuestion();
    }
}
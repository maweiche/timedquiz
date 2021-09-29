//------------- VARIABLES 
var qText = document.querySelector(".question-words");
var qOption = document.querySelector(".option")
var score = document.querySelector(".score");
var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitButton = document.getElementsByClassName("submit");
var nextButton = document.getElementsByClassName("next")[0];
var verdict = document.getElementsByClassName("verdict");
var userName = document.getElementById("userNameEl");
var scoreToRecord = document.querySelector(".scoreToRecord");
var saveScoreButton = document.getElementById("submitScoreButton");
var resetButton = document.getElementById(".resetButton");
var highScoreBox = document.getElementById("highScoreContainer");
var currentScoreEl = document.getElementById("currentScore");
var loseGameScreenEl = document.getElementById("loseGameScreenContainer");
var userNameEl = document.getElementById("userNameEl");
var questionContainerEl = document.getElementById("question");
var showHighScoresBtn = document.getElementById("showHighScores");
var storedNameEl = document.getElementById("storedName");
var storedScoreEl = document.getElementById("storedScore");

var scoreCounter = 0;
var isWin = false;
var timer;
var timerCount;
var selected ;
var id = 0;
var scoresArray = [];

//----------------Array of questions
var questions = [
    {
        id: 0,
        q: "How many states are in the United States?",
        a: [{ text: "50", isCorrect: true},
            { text: "25", isCorrect: false},
            { text: "39", isCorrect: false},
            { text: "51", isCorrect: false}
        ]
    },
    {
        id: 1,
        q: "The cow jumped over the -- what?",
        a: [{ text: "dog", isCorrect: false},
            { text: "sea", isCorrect: false},
            { text: "cat", isCorrect: false},
            { text: "moon", isCorrect: true}
        ]
    },
    {
        id: 2,
        q: "A unicycle has how many tires?",
        a: [{ text: "2", isCorrect: false},
            { text: "12", isCorrect: false},
            { text: "1", isCorrect: true},
            { text: "11", isCorrect: false}
        ]
    },
    {
        id: 3,
        q: "What did I do to get in trouble?",
        a: [{ text: "I should know..", isCorrect: false},
            { text: "Nothing.", isCorrect: true},
            { text: "What did I not do?", isCorrect: false},
            { text: "The dishes.", isCorrect: false}
        ]
    },
    {
        id:4,
        q: "Game Over!"
    }
    ];
//Event Listener for Start Quiz button
startButton.addEventListener("click", startQuiz);


//Hide on start 
document.querySelector("#op1").style.visibility = "hidden";
document.querySelector("#op2").style.visibility = "hidden";
document.querySelector("#op3").style.visibility = "hidden";
document.querySelector("#op4").style.visibility = "hidden";
document.querySelector(".submit").style.visibility  = "hidden";


//------------------FUNCTIONS 


//----GAME OVER SCREEN FUNCTION
//The loseGame function is called when timer reaches 0
function loseGame() {
    qText.textContent = "The Quiz is now over!"
    startButton.disabled = false;
    document.querySelector(".submit").style.visibility  = "hidden";
    document.querySelector("#op1").style.visibility = "hidden";
    document.querySelector("#op2").style.visibility = "hidden";
    document.querySelector("#op3").style.visibility = "hidden";
    document.querySelector("#op4").style.visibility = "hidden";
    // document.querySelector(".highScores").style.visibility = "visible";
    clearInterval(timer);
    currentScoreEl.textContent = scoreCounter;

    //Make it visible 
    loseGameScreenEl.style.display = "flex"; 
    saveScoreButton.addEventListener("click", function() {

        var saveInput = { userName: userNameEl.value.trim(), userScore: scoreCounter};
                    //if it does not exist already, push first score
                    if (typeof localStorage.getItem("scores") == "object") {
                        scoresArray.push(saveInput);
                        localStorage.setItem("scores", JSON.stringify(scoresArray));
                    } else {
                        var pulledScores = JSON.parse(localStorage.getItem("scores"));
                        pulledScores.push(saveInput);
                        localStorage.setItem("scores", JSON.stringify(pulledScores));
                    }

                });
                showHighScoresBtn.addEventListener("click", function () {
                    highScoreBox.innerHTML = localStorage.getItem("scores").userNameEl;
                })
}
////Function to Show stored High Scores
function showHighScores() {
    highScoreBox.style.display = "flex"
    if (pulledScores = null) {
        storedNameEl.style.display = "none";
        storedScoreEl.style.display = "none";
        qText.textContent = "No Data";
    } else {
        storedNameEl.style.display = "flex";
        storedScoreEl.style.display = "flex";
        var allHighScores = JSON.parse(localStorage.getItem("scores"));
        for (var i = 0; i < allHighScores.length; i++)
            var newNmBox = document.createElement("h4");
            var newScBox = document.createElement("h4");
            highScoreBox.appendChild(newNmBox);
            highScoreBox.appendChild(newScBox);
            newNmBox.style.display = "flex";
            newScBox.style.display = "flex";
            newNmBox.style.width = "50%";
            newScBox.style.width = "50%";

            var forNm = document.createElement("h4");
            var forSc = document.createElement("h4");
            newNmBox.appendChild(forNm);
            newScBox.appendChild(forSc);
            forNm.textContent = allHighScores[i].userName;
            forSc.textContent = allHighScores[i].userScore;
    }
}
/////Function to iterate through Questions Array
function iterate(id) {

    // score.innerHTML = scoreUpdate;
    //Displaying result section
    // score.innerText = "";

    //Display Question
    qText.innerText = questions[id].q;
    //Call Options by Id
    var op1 = document.getElementById("op1");
    var op2 = document.getElementById("op2");
    var op3 = document.getElementById("op3");
    var op4 = document.getElementById("op4");

    //Display Options text
    op1.innerText = questions[id].a[0].text;
    op2.innerText = questions[id].a[1].text;
    op3.innerText = questions[id].a[2].text;
    op4.innerText = questions[id].a[3].text;

    //Establish true/false value to each option
    op1.value = questions[id].a[0].isCorrect;
    op2.value = questions[id].a[1].isCorrect;
    op3.value = questions[id].a[2].isCorrect;
    op4.value = questions[id].a[3].isCorrect;

/////Add event listeners for click on Question's "Answer Option"
    op1.addEventListener("click", () => {
        op1.style.backgroundColor = "pink";
        op2.style.backgroundColor = "green";
        op3.style.backgroundColor = "green";
        op4.style.backgroundColor = "green";
        selected = op1.value;
    })

    op2.addEventListener("click", () => {
        op1.style.backgroundColor = "green";
        op2.style.backgroundColor = "pink";
        op3.style.backgroundColor = "green";
        op4.style.backgrondColor = "green";
        selected = op2.value;
    })

    op3.addEventListener("click", () => {
        op1.style.backgroundCOlor = "green";
        op2.style.backgroundColor = "green";
        op3.style.backgroundColor = "pink";
        op4.style.backgroundColor = "green";
        selected = op3.value;

    })

    op4.addEventListener("click", () => {
        op1.style.backgroundColor = "green";
        op2.style.backgroundColor = "green";
        op3.style.backgroundColor = "green";
        op4.style.backgroundColor = "pink";
        selected = op4.value;
    })
    // console.log(scoreCounter);
}
//////Click Event for Answer Option Submission... compares if answer option has true or false value. If true it adds a point to the score counter, if false it takes off 5 seconds from quiz clock.  True returns Correct alert, False returns Wrong alert.
submitButton[0].onclick = function(event) {
    id++;
    console.log("clicking on submit btn", selected);
    if (id < 4) {
        iterate(id);    
        console.log(id);
    }
    
    if (selected === "true" ) {
        verdict[0].innerHTML = "Correct!"
        verdict[0].style.color = "green";
        scoreCounter++;
        console.log("scoreCounter", scoreCounter);
    } //answer is false 
    else if (selected === "false") {
        verdict[0].innerHTML = "Wrong!";
        verdict[0].style.color = "red";
        timerCount -= 5;
        console.log("timerCount", timerCount, scoreCounter);
    }
    if (qText.textContent === "Game Over!"){
        loseGame();
    } if (id > 3){
        loseGame();
        return;
    };
    return;
    
} 


//Function for if Quiz is started 
function startQuiz () {
    document.querySelector("#op1").style.visibility = "visible";
    document.querySelector("#op2").style.visibility = "visible";
    document.querySelector("#op3").style.visibility = "visible";
    document.querySelector("#op4").style.visibility = "visible";
    document.querySelector(".submit").style.visibility  = "visible";
    //render qText
    iterate("0");
     // function startGame() {
    isWin = false;
    timerCount = 60;
    //Prevents start button from being clicked when round is in progress
    startButton.disabled = true;
    startTimer();


///Function to start timer, and if timer runs out it triggers loseGame function to start end of game process
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (qText.textContent === "Game Over!") {
          loseGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }
};







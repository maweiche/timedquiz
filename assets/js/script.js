//------------- VARIABLES 
var qText = document.querySelector(".question-words");
var qOption = document.querySelector(".option")
var score = document.querySelector(".score");
var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var submitButton = document.getElementsByClassName("submit");
var nextButton = document.getElementsByClassName("next")[0];
var verdict = document.getElementsByClassName("verdict");
var userName = document.querySelector(".userName");
var scoreToRecord = document.querySelector(".scoreToRecord");
var saveScoreButton = document.getElementById("submitScoreButton");
var resetButton = document.getElementById(".resetButton");
var highScores = document.querySelector(".highScores");
var highScoreBox = document.getElementById("highscoreContainer");
var currentScoreEl = document.getElementById("currentScore");
var loseGameScreenEl = document.getElementById("loseGameScreenContainer")

var scoreCounter = 0;
var isWin = false;
var timer;
var timerCount;
var selected ;
var id = 0;

//Array of questions
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
//New idea
startButton.addEventListener("click", startQuiz);

//Hide on start 
document.querySelector("#op1").style.visibility = "hidden";
document.querySelector("#op2").style.visibility = "hidden";
document.querySelector("#op3").style.visibility = "hidden";
document.querySelector("#op4").style.visibility = "hidden";
document.querySelector(".submit").style.visibility  = "hidden";

// document.querySelector(".highScores").style.visibility = "hidden";

//------------------FUNCTIONS 

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
    // var askInitials = prompt("Enter your initials.");
    // console.log(askInitials);
        // function storeScoreInput() {
        // var saveInput = {
        //     initials: askInitials.trim(),
        //     score: scoreCounter
        // };
        // localStorage.setItem("saveInput", JSON.stringify(saveInput));
        //     console.log(localStorage.setItem("saveInput", JSON.stringify(saveInput)));
        // };
        // document.getElementsByClassName(".saveScores").addEventListener("click", storeScoreInput());
        
    
    
}

//maybe change const to var if funky
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
//Function to loseGameScreen
// function loseGameScreen() {
//     loseGameScreen.style.display = "flex";
//     //hide question box??
//     saveScore.addEventListener("click", function () {
//         let scoresInput = { userName: nameInput.value.trim(), userScore: scoreCounter};
//         //if it does not exist already, push first score
//         if (typeof localStorage.getItem("scores" == "object") {
//             scoresArray.push(scoresObject);
//             localStorage.setItem("scores", JSON.stringify(scoresArray));
//             //if does not exist pull scores, push ne
//         } else {
//             var pulledScores = JSON.parse(localStorage.getItem("scores"));
//             pulledScores.push(scoresObject);
//             localStorage.setItem("scores", JSON.stringify(pulledscores));
//         })
//     })
// }


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
//The gameOver function is called when the game completion condition is met
function gameOver() {
    qText.textContent = "The Quiz is now over!"
    // scoreCounter
    startButton.disabled = false;
}


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







var qText = document.querySelector(".question-words");
var qOptions = document.querySelector(".options-words")
var score = document.querySelector(".score");
var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var scoreCounter = 0;
var isWin = false;
var timer;
var timerCount;

//Array of questions
var questions = [
    {
        number: 1,
        question: "Who thou?",
        answer: "A",
        options: [
            "A",
            "B",
            "C",
            "D",
        ]
    },
    {
        number: 2,
        question: "Where thou?",
        answer: "A",
        options: [
            "A",
            "B",
            "C",
            "D",
        ]
    },
    {
        number: 3,
        question: "Why thou?",
        answer: "A",
        options: [
            "A",
            "B",
            "C",
            "D",
        ]
    },
    {
        number: 4,
        question: "Who thou?",
        answer: "A",
        options: [
            "A",
            "B",
            "C",
            "D",
        ]
    },
    ];

//The ini function is called when the page loads
function init() {
    getHighScores();
}

//The startGame function is called when the start button is clicked
function startGame() {
    isWin = false;
    timerCount = 10;
    //Prevents start butto from being clicked when round is in progress
    startButton.disabled = true;
    renderQText()
    startTimer()
}

//The gameOver function is called when the game completion condition is met
function gameOver() {
    qText.textContent = "The Quiz is now over!"
    // scoreCounter
    startButton.disabled = false;
    setScore();
}

//The loseGame function is called when timer reaches 0
function loseGame() {
    qText.textContent = "The Quiz is now over!"
    //scoreCounter
    startButton.disabled = false;
    setScore();
}

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
      timerCount--;
      timerEl.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
  }

//The startTimer function starts and stops the timer and triggers gameOver
// function startTimer() {
//     //Sets timer
//     timer = setInterval(function() {
//         timerCount--;
//         timerEl.textContent = timerCount;
//         if (timerCount >= 0) {
//             //Tests if win condition is met
//             if (isWin && timerCount > 0) {
//                 //Clears interval and stops timer
//                 clearInterval(timer);
//                 gameOver();
//             }
//         }
//         //Tests if time has run out
//         if (timerCount === 0) {
//             clearInverval(timer);
//             loseGame();
//         }
//      }, 1000);
// }
//Creates question text on screen
function renderQText(index) {
    //Picks question from question array
    chosenQ = questions[Math.floor(Math.random() * questions.length)];
    qText.textContent = chosenQ.question;
    qOptions.textContent = chosenQ.options;
}
    // var queTag = "Question" + ":" +questions[index].question[2];
//     var optionTag = '<div class="option"><span>'+ questions[index].options[0]+'</span></div>'
//     + '<div class="option"><span>'+ questions[index].options[1]+'</span></div>'
//     + '<div class="option"><span>'+ questions[index].options[2]+'</span></div>'
//     + '<div class="option"><span>'+ questions[index].options[3]+'</span></div>';
//     qText.textContent = queTag;
//     options.textContent = optionTag;

//     var option = options.querySelectorAll(".option");

//     for(i=0; i < options.length; i++){
//         option[i].setAttribute("onclick", "optionSelected(this)");
//     }
// }

//Updates scores on screen and sets score and initals to client storage
function setScore() {
    score.textContent = scoreCounter;
    localStorage.setItem("scoreCount", scoreCounter);
}

//These functions are used by init
function getHighScores() {
    //Get stored value from client storage, if it exists
    var storedScores = localStorage.getItem("scoreCount");
    //If stored value doesn't exist, set counter to blank
    if (storedScores === null) {
        scoreCounter = "";
    } else {
        //If a value is retrieved from client storage then display it
        scoreCounter = storedScores;
    }
    //Render scores to page
    score.textContent = scoreCounter;
}

function checkWin() {
    //If the button selected is the correct answer then set isWin to true
    if (chosenQ = rightAnswer.join("")) {
        //This value is used in the timer function to test if gameOver condition is met
        isWin = true;
    }
}
// Tests if guessed selection is the rightAnswer
// function checkAnswer(selection) {
//     var userSelection = false;
//     for (var i = 0; i < 
// }

//Attach event listener to start button to call startGame function on click
document.addEventListener("click", startGame);

//Calls init() so that it fires when page opens
init();

//Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
    scoreCounter = 0;
    //Renders score and sets it into the client storage
    setScore()
}
//Attaches event listener to button
resetButton.addEventListener("click", resetGame);
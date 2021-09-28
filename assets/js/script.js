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
var saveScores = document.getElementsByClassName(".saveScores");
var resetButton = document.getElementById(".resetButton");
var highScores = document.querySelector(".highScores");
var highScoreBox = document.getElementById("highscoreContainer");
var currentScoreEl = document.getElementById("currentScore");

var scoreCounter = 0;
var isWin = false;
var timer;
var timerCount;

document.querySelector("#op1").style.visibility = "hidden";
document.querySelector("#op2").style.visibility = "hidden";
document.querySelector("#op3").style.visibility = "hidden";
document.querySelector("#op4").style.visibility = "hidden";
document.querySelector(".submit").style.visibility  = "hidden";

// document.querySelector(".highScores").style.visibility = "hidden";
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
    var askInitials = prompt("Enter your initials.");
    console.log(askInitials);
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

    var selected = "";

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
    console.log("clicking on submit btn");
    if (id < 4) {
        iterate(id);    
        console.log(id);
    }
    if (event.target[4] == "true") {
        verdict[0].innerHTML = "Correct!"
        verdict[0].style.color = "green";
        scoreCounter++;
        console.log(scoreCounter);
    } if (event.target[4] == "false") {
        verdict[0].innerHTML = "Wrong!";
        verdict[0].style.color = "Red!";
        timerCount -= 5;
    }if (qText.textContent === "Game Over!"){
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

var id = 0;









////HIGH SCORE AREA/////////////////////
// const  NUMBOFHIGHSCORES = 5;
// const  HIGHSCORES = "highScores";

// const highScoreString = localStorage.getItem(HIGHSCORES);
// const highScores = JSON.parse(highScoreString) ?? [];

// const lowestScore = highScores [NUMBOFHIGHSCORES - 1]?.score ?? 0;

// function checkHighScore(score) {
//     const  highScores = JSON.parse(localStorage.getItem(HIGHSCORES)) ?? [];
//     const lowestScore = highScores[NUMBOFHIGHSCORES - 1]?.score ?? 0;

//     if (score > lowestScore) {
//         saveHighScore(score, highScores);
//         showHighScores();
//     }
// }












// nextButton.addEventListener("click", () => {
//     start = false;
    
// })
























// //The ini function is called when the page loads
// function init() {
//     getHighScores();
// }

// //The startGame function is called when the start button is clicked
// function startGame() {
//     isWin = false;
//     timerCount = 10;
//     //Prevents start butto from being clicked when round is in progress
//     startButton.disabled = true;
//     renderQText()
//     startTimer()
// }

// //The gameOver function is called when the game completion condition is met
// function gameOver() {
//     qText.textContent = "The Quiz is now over!"
//     // scoreCounter
//     startButton.disabled = false;
//     setScore();
// }

// //The loseGame function is called when timer reaches 0
// function loseGame() {
//     qText.textContent = "The Quiz is now over!"
//     //scoreCounter
//     startButton.disabled = false;
//     setScore();
// }

// function startTimer() {
//     // Sets timer
//     timer = setInterval(function() {
//       timerCount--;
//       timerEl.textContent = timerCount;
//     //   if (timerCount >= 0) {
//     //     // Tests if win condition is met
//     //     if (isWin && timerCount > 0) {
//     //       // Clears interval and stops timer
//     //       clearInterval(timer);
//     //       winGame();
//     //     }
//     //   }
//       // Tests if time has run out
//       if (timerCount === 0) {
//         clearInterval(timer);
//         loseGame();
//       }
//     }, 1000);
//   }

// //The startTimer function starts and stops the timer and triggers gameOver
// // function startTimer() {
// //     //Sets timer
// //     timer = setInterval(function() {
// //         timerCount--;
// //         timerEl.textContent = timerCount;
// //         if (timerCount >= 0) {
// //             //Tests if win condition is met
// //             if (isWin && timerCount > 0) {
// //                 //Clears interval and stops timer
// //                 clearInterval(timer);
// //                 gameOver();
// //             }
// //         }
// //         //Tests if time has run out
// //         if (timerCount === 0) {
// //             clearInverval(timer);
// //             loseGame();
// //         }
// //      }, 1000);
// // }
// //Creates question text on screen
// function renderQText(index) {
//     //Picks question from question array
//     chosenQ = questions[Math.floor(Math.random() * questions.length)];
//     qText.textContent = chosenQ.question;
//     // qOptions.textContent = chosenQ.options[0],chosenQ.options[1],chosenQ.options[2],chosenQ.options[3];
//     var chosenQOptions = [chosenQ.options[0], chosenQ.options[1], chosenQ.options[2],chosenQ.options[3]];

//     function dispOptions () {
//         // var more=document.getElementById("more");
//         for (var i=0; i < chosenQOptions.length; i++) {
//             var butt=document.createElement("button");
//             butt.innerHTML=chosenQOptions[i];
//             qOptions.appendChild(butt);  
//         }

//         qOptions.addEventListener("click", function(event) {
//             var clickedOption = event.target;
//             if (clickedOption = chosenQ.answer){
//                 score++;
//             }
//             console.log(clickedOption);
//             chosenQOptions = []; // need to empty question options array somehowx`
//         });
//     }        dispOptions();
//     }


//     // var queTag = "Question" + ":" +questions[index].question[2];
// //     var optionTag = '<div class="option"><span>'+ questions[index].options[0]+'</span></div>'
// //     + '<div class="option"><span>'+ questions[index].options[1]+'</span></div>'
// //     + '<div class="option"><span>'+ questions[index].options[2]+'</span></div>'
// //     + '<div class="option"><span>'+ questions[index].options[3]+'</span></div>';
// //     qText.textContent = queTag;
// //     options.textContent = optionTag;

// //     var option = options.querySelectorAll(".option");

// //     for(i=0; i < options.length; i++){
// //         option[i].setAttribute("onclick", "optionSelected(this)");
// //     }
// // }

// //Updates scores on screen and sets score and initals to client storage
// function setScore() {
//     score.textContent = scoreCounter;
//     localStorage.setItem("scoreCount", scoreCounter);
// }

// //These functions are used by init
// function getHighScores() {
//     //Get stored value from client storage, if it exists
//     var storedScores = localStorage.getItem("scoreCount");
//     //If stored value doesn't exist, set counter to blank
//     if (storedScores === null) {
//         scoreCounter = "";
//     } else {
//         //If a value is retrieved from client storage then display it
//         scoreCounter = storedScores;
//     }
//     //Render scores to page
//     score.textContent = scoreCounter;
// }

// function checkWin() {
//     //If the button selected is the correct answer then set isWin to true
//     if (chosenQ.answer.textContent = clickedOption) {
//         //This value is used in the timer function to test if gameOver condition is met
//         scoreCounter++;
//     }
// }
// // Tests if guessed selection is the rightAnswer
// // function checkAnswer(selection) {
// //     var userSelection = false;
// //     for (var i = 0; i < 
// // }

// //Attach event listener to start button to call startGame function on click
// document.addEventListener("click", startGame);

// //Calls init() so that it fires when page opens
// init();

// //Add reset button
// var resetButton = document.querySelector(".reset-button");

// function resetGame() {
//     scoreCounter = 0;
//     //Renders score and sets it into the client storage
//     setScore()
// }
// //Attaches event listener to button
// resetButton.addEventListener("click", resetGame);
var startButton = document.querySelector(".start-button");
var timerEleValue = document.querySelector(".timer-count");
var resetButton = document.querySelector(".reset-button");
var questionSection = document.querySelector(".question");
var button1 = document.querySelector(".button-1");
var button2 = document.querySelector(".button-2");
var button3 = document.querySelector(".button-3");
var button4 = document.querySelector(".button-4");
var buttonSection = document.querySelector(".button-section");

resetButton.disabled = true;

//initialize timer to 60 seconds
var timerCount = 60;
//initialize win and lose to false and totals to zero
var win = false;
var lose = false;
var reset = false;
var totalWins = 0;
var totalLoses = 0;

//Questions Section:
var questions = [
    question1 = {
        text: "What color is the sky?",
        entries: ["red","orange","blue","green"],
        answer: 3
    }
]



// A timer that counts down each second
function startTimer() { 
    timer = setInterval(function() {
        timerCount--;
        timerEleValue.textContent = timerCount;
        
        //on lose
        if (timerCount <= 0){
            lose = true;
            // call loseGame which resets the timerCount and creates a reset button
            // for the user to press to restart the game 
            clearInterval(timer);
            timerCount = 60;
            timerEleValue.textContent = timerCount;
            loseGame(); 
            
        }
        if ( win || lose || reset){
            clearInterval(timer);
            timerCount = 60;
            timerEleValue.textContent = timerCount;
        }
        //modify some sort of display element to show the new timer value
        timerEleValue.textContent = timerCount;
    }, 1000);
}

function dispalyQuestion(){
    questionSection.removeAttribute("hidden");

}

function startGame() {
    displayQuestion();
    reset = false;
    startButton.disabled = true;
    resetButton.disabled = false;
    startTimer();
}

function resetGame() {
    reset = true;
    startButton.disabled = false;
    resetButton.disabled = true;

}
function loseGame() {
    timerCount = 60;
    timerEleValue.textContent = timerCount;
    lose = false;
    win = false;
    totalLoses++;
    //change display element to show the reset button or something...
}


function winGame(){
    timerCount = 60;
    timerEleValue.textContent = timerCount;
    lose = false;
    win = false;
    totalwins++;
    //change display element to show the reset button or something...
}

//start the game when pressing a button that says start.
startButton.addEventListener("click",startGame);
resetButton.addEventListener("click",resetGame);
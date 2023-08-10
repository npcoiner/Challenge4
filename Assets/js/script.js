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
var questionNumber = -1;

//Questions Section:
var questions = [
    {
        text: "What color is the sky?",
        entries: ["red","orange","blue","green"],
        answer: 3
    },
];



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
};

function displayQuestion(){
    questionSection.removeAttribute("hidden");
    buttonSection.removeAttribute("hidden");
    questionNumber++;
    questionSection.textContent = questions[questionNumber].text;
    button1.textContent = questions[questionNumber].entries[0];
    button2.textContent = questions[questionNumber].entries[1];
    button3.textContent = questions[questionNumber].entries[2];
    button4.textContent = questions[questionNumber].entries[3];
};

function startGame() {
    displayQuestion();
    reset = false;
    startButton.disabled = true;
    resetButton.disabled = false;
    questionSection.hidden = false; 
    buttonSection.hidden = false; 
    startTimer();
};

function resetGame() {
    reset = true;
    win = false;
    lose = false;
    questionNumber = -1;
    startButton.disabled = false;
    resetButton.disabled = true;
    questionSection.hidden = true; 
    buttonSection.hidden = true; 

};
function loseGame() {
    timerCount = 60;
    timerEleValue.textContent = timerCount;
    lose = true;
    win = false;
    questionSection.hidden = true; 
    buttonSection.hidden = true; 
    totalLoses++;
    //change display element to show the reset button or something...
};


function winGame(){
    timerCount = 60;
    timerEleValue.textContent = timerCount;
    questionSection.text = "Add"; 
    buttonSection.hidden = true; 
    lose = false;
    win = true;
    totalWins++;
    //change display element to show the reset button or something...
};

function isCorrect(x, e){
    e.preventDefault();
    if (x == questions[questionNumber].answer - 1){
        

        if (questionNumber + 1 == questions.length){    
            winGame();
        }else{
            displayQuestion();
        }
        
    }
    else{
        timerCount -= 10;
    }
    
};
//start the game when pressing a button that says start.
startButton.addEventListener("click",startGame);
resetButton.addEventListener("click",resetGame);
button1.addEventListener("click",(e) => isCorrect(0,e));
button2.addEventListener("click",(e) => isCorrect(1,e));
button3.addEventListener("click",(e) => isCorrect(2,e));
button4.addEventListener("click",(e) => isCorrect(3,e));


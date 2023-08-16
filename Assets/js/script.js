var startButton = document.querySelector(".start-button");
var timerEleValue = document.querySelector(".timer-count");
var resetButton = document.querySelector(".reset-button");
var questionSection = document.querySelector(".question");
var button1 = document.querySelector(".button-1");
var button2 = document.querySelector(".button-2");
var button3 = document.querySelector(".button-3");
var button4 = document.querySelector(".button-4");
var buttonSection = document.querySelector(".button-section");
var displayHighscoreEle = $('#high-score-section');
var form = document.getElementById("form-id");


resetButton.disabled = true;

//initialize timer to 60 seconds
var timerCount = 60;
//initialize win and lose to false and totals to zero
var win = false;
var reset = false;
var totalWins = 0;
var questionNumber = -1;

//Questions Section:
var questions = [
    {
        text: "What color is the sky?",
        entries: ["red","orange","blue","green"],
        answer: 3
    },
    {
        text: "What color is my ass?",
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
            win = true;
            // call loseGame which resets the timerCount and creates a reset button
            // for the user to press to restart the game 
            clearInterval(timer);
            timerCount = 60;
            timerEleValue.textContent = timerCount;
            endGame(); 
            
        }
        if ( win || reset){
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


function saveScore(scores) {
    localStorage.setItem("highScore", JSON.stringify(scores));
}

function displayHighscore(){
    var storedScore = localStorage.getItem("highScore");
    displayHighscoreEle.empty();
    if (storedScore){
        storedScore = JSON.parse(storedScore);
        displayHighscoreEle.disabled = false;
        displayHighscoreEle.textContent = storedScore;
    } else{
        storedScore = [];
        displayHighscoreEle.disabled = true;
    }
    
    for (var i = 0; i < storedScore.length; i++){
        var rowEle = $('<tr>');
        var nameEle = $('<td>').text(storedScore.name);
        var scoreEle = $('<td>').text(storedScore.score);
        rowEle.append(nameEle, scoreEle);
        displayHighscoreEle.append(rowEle);

    }
}
function startGame() {
    timerCount = 60;
    questionNumber = -1;
    displayQuestion();
    form.hidden = true;

    reset = false;
    startButton.disabled = true;
    resetButton.disabled = false;
    questionSection.hidden = false; 
    buttonSection.hidden = false; 
    startTimer();
};
function resetGame() {
    questionNumber = -1;
    reset = true;
    startTimer();
    startButton.disabled = false;
    resetButton.disabled = true;
    questionSection.hidden = true; 
    buttonSection.hidden = true; 
}
function recordScore(){
    questionSection.text = "Add"; 
}


function endGame(){
    timerCount = 60;
    timerEleValue.textContent = timerCount;
    questionSection.textContent = "Record Score?"; 
    form.hidden = false;

    buttonSection.hidden = true; 
    win = true;
    totalWins++;
    recordScore();
};

function isCorrect(x, e){
    e.preventDefault();
    if (x == questions[questionNumber].answer - 1){
        

        if (questionNumber + 1 == questions.length){    
            endGame();
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

form.addEventListener("submit", (e) => {
    e.preventDefault;
    let name = document.getElementById("name");
    form.submit();
});
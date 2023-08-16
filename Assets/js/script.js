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
var score = 0;
var currentHighscore = [{
    'initials' : "NC",
    'score' : 2,
}];

//Questions Section:
var questions = [
    {
        text: "What color is the sky?",
        entries: ["red","orange","blue","green"],
        answer: 3
    },
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


function saveScore(scoreEntry) {
    localStorage.setItem("highScore", JSON.stringify(scoreEntry));
}

function displayHighscore(){
    var storedScore = localStorage.getItem("highScore");
    displayHighscoreEle.empty();
    if (storedScore){
        storedScore = JSON.parse(storedScore);
        displayHighscoreEle.show();
    } else{
        storedScore = [];
    }
    
    currentHighscore = storedScore;
    for (var i = 0; i < currentHighscore.length; i++){
        console.log(currentHighscore[i]);
        var rowEle = $('<div>');
        var nameEle = $('<div>').text(currentHighscore[i].initials + " " + currentHighscore[i].score);
        rowEle.append(nameEle);
        displayHighscoreEle.append(rowEle);
    }
}
function startGame() {
    console.log("starting")
    displayHighscore()
    timerCount = 60;
    score = 0;
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
    console.log("ressetting");
    displayHighscore()
    questionNumber = -1;
    score = 0;
    reset = true;
    startTimer();
    startButton.disabled = false;
    resetButton.disabled = true;
    questionSection.hidden = true; 
    buttonSection.hidden = true; 
}

function endGame(){
    displayHighscore()
    timerCount = 60;
    timerEleValue.textContent = timerCount;
    questionSection.textContent = "Record Score?"; 
    form.hidden = false;

    buttonSection.hidden = true; 
    win = true;
    totalWins++;
};

function isCorrect(x, e){
    e.preventDefault();
    if (x == questions[questionNumber].answer - 1){
        score++;

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
    console.log("HELLO???")
    console.log(currentHighscore);
    e.preventDefault;
    let initials = document.getElementById("initials").value;
    console.log(initials)
    let scoreEntry = {
        'initials': initials,
        'score': score
    }
    console.log(scoreEntry)
    currentHighscore.push(scoreEntry);
    console.log(currentHighscore);
    saveScore(currentHighscore);
    displayHighscore();
});
displayHighscore();

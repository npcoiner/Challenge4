

//initialize timer to 60 seconds
var timerCount = 60;
//initialize win and lose to false and totals to zero
var win = false;
var lose = false;
var totalWins = 0;
var totalLoses = 0;


// A timer that counts down each second
function startTimer() { 
    timer = setInterval(function() {
        timerCount--;
        //modify some sort of display element to show the new timer value

        //on lose
        if (timerCount <= 0){
            lose = true;
            // call loseGame which resets the timerCount and creates a reset button
            // for the user to press to restart the game  
            loseGame(); 
        }
        if ( win || lose){
            clearInterval(timer);
        }
    }, 1000);
}

//loseGame function

function loseGame() {
    timerCount = 60;
    lose = false;
    win = false;
    totalLoses++;
    //change display element to show the reset button or something...
}

function winGame(){
    timerCount = 60;
    lose = false;
    win = false;
    totalwins++;
    //change display element to show the reset button or something...
}



// A timer that counts down each second
function startTimer() { 
    timer = setInterval(function() {
        timerCount--;
        //modify some sort of display element to show the new timer value


        //need someway to reset the counter and stop counting 
        //if the user either wins or fails
    }, 1000);
}
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
        text: "Inside which HTML element do we put the JavaScript?",
        entries: ["<javascript>",
            "<js>",
            "<script>",
            "<scripting>"],
        answer: 2
    },
    {
        text: "What is the correct JavaScript syntax to write 'Hello World'?",
        entries: ["response.write('Hello World')",
            "'Hello World'",
            "document.write('Hello World')",
            "('Hello World')"],
        answer: 2
    },
    {
        text: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        entries: ["<script src='xxx.js'>",
            "<script name='xxx.js'>",
            "<script href='xxx.js'>",
            "<script value='xxx.js'>"],
        answer: 0
    },
    {
        text: "How do you write 'Hello World' in an alert box?",
        entries: ["alert('Hello World')",
            "msgBox('Hello World')",
            "alertBox='Hello World'",
            "alertBox('Hello World')"],
        answer: 0
    },
    {
        text: "How do you create a function?",
        entries: ["function:myFunction()",
            "function=myFunction()",
            "function myFunction()",
            "myFunction():function"],
        answer: 2
    },
    {
        text: "How do you call a function named 'myFunction'?",
        entries: ["call myFunction()",
            "myFunction()",
            "call function myFunction",
            "Call.myFunction()"],
        answer: 1
    },
    {
        text: "How do you write a conditional statement for executing some statements only if 'i' is equal to 5?",
        entries: ["if i==5 then",
            "if (i==5)",
            "if i=5 then",
            "if i=5"],
        answer: 1
    },
    {
        text: "How do you write a conditional statement for executing some statements only if 'i' is NOT equal to 5?",
        entries: ["if (i != 5)",
            "if =! 5 then",
            "if (i <> 5)",
            "if <>5"],
        answer: 0
    },
    {
        text: "How many looping statements are there in JavaScript?",
        entries: ["2. The 'for' loop, and the 'while' loop",
            "4. The 'for' loop, the 'while' loop, the 'do...while' loop, and the 'loop...until' loop",
            "3. The 'for' loop, the 'while' loop, and the 'do...while' loop",
            "The 'for' loop"],
        answer: 2
    },
    {
        text: "How does a 'for' loop start?",
        entries: ["for (i = 0; i <= 5)",
            "for (i = 0; i <= 5; i++)",
            "for i = 1 to 5",
            "for (i <= 5; i++)"],
        answer: 1
    },
    {
        text: "How can you add a comment in a JavaScript?",
        entries: ["//This is a comment",
            "'This is a comment",
            "<!--This is a comment-->",
            "#This is a comment"],
        answer: 0
    },
    {
        text: "What is the correct way to write a JavaScript array?",
        entries: ["var txt = new Array(1:'tim',2:'kim',3:'jim')",
            "var txt = new Array='tim','kim','jim'",
            "var txt = new Array:1=('tim')2=('kim')3=('jim')",
            "var txt = new Array('tim','kim','jim')"],
        answer: 3
    },
    {
        text: "How do you round the number 7.25, to the nearest whole number?",
        entries: ["Math.rnd(7.25)",
            "round(7.25)",
            "rnd(7.25)",
            "Math.round(7.25)"],
        answer: 3
    },
    {
        text: "How do you find the largest number of 2 and 4?",
        entries: ["Math.ceil(2,4)",
            "Math.max(2,4)",
            "ceil(2,4)",
            "top(2,4)"],
        answer: 1
    },
    {
        text: "What is the correct JavaScript syntax for opening a new window called 'window2' ?",
        entries: ["open.new('http://www.w3schools.com','window2')",
            "new('http://www.w3schools.com','window2')",
            "new.window('http://www.w3schools.com','window2')",
            "window.open('http://www.w3schools.com','window2')"],
        answer: 3
    },
    {
        text: "How do you put a message in the browser's status bar?",
        entries: ["statusbar = 'put your message here'",
            "window.status('put your message here')",
            "window.status = 'put your message here'",
            "status('put your message here')"],
        answer: 2
    },
    {
        text: "How do you find the client's browser name?",
        entries: ["client.navName",
            "navigator.appName",
            "browser.name",
            "Browser.value"],
        answer: 1
    },
    {
        text: "What are the basic ways that people can become aware of your Web site?",
        entries: ["URL is told by somebody.",
            "The link is followed from another Web site.",
            "Your site is listed in a search engine.",
            "All of the above."],
        answer: 3
    },
    {
        text: "What are the basic ways to provide hints for search engines?",
        entries: ["Put keywords in the <TITLE> tag of the Web page.",
            "Put keywords in the first few lines of the Web page.",
            "Put keywords as many times as possible in the Web page.",
            "All of the above for every major search engines."],
        answer: 3
    },
    {
        text: "The Web security issues are involved in",
        entries: ["Server.",
            "CGI script.",
            "Client.",
            "All of the above."],
        answer: 3
    },
    {
        text: "What should you keep in mind when you use links in a Web page?",
        entries: ["Never put two links immediately adjacent to one another.",
            "Keep the link content as concise as possible.",
            "Both A and B.",
            "Need not worry too much about links in general."],
        answer: 2
    },
    {
        text: "What should you keep in mind when you use images in a Web page",
        entries: ["Keep the image simple.",
            "Isolate large graphics.",
            "Both A and B.",
            "Need not worry about putting in images in general."],
        answer: 2
    },
    {
        text: "In an HTML form, if you require users to input a number that has a maximum of ten digits, like a telephone number, you can use the _____ property/attribute to make sure that no more than ten digits are accepted in the field.",
        entries: ["Length",
            "Maxlength",
            "Value",
            "None of the above."],
        answer: 1
    },
    {
        text: "In HTML, use the _____ property/attribute to set a default value that displays in an input box when the form is initially displayed.",
        entries: ["Default",
            "Value",
            "Form",
            "None of the above."],
        answer: 1
    },
    {
        text: "In HTML, the _____ property/attribute identifies the CGI script that will process a form.",
        entries: ["Value",
            "Action",
            "Enctype",
            "hidden"],
        answer: 1
    },
    {
        text: "The majority of a typical Web document will be found in:",
        entries: ["the head tag.",
            "the title tag.",
            "the body tag.",
            "a comment tag."],
        answer: 2
    },
    {
        text: "In JavaScript, the symbols + - * and / are:",
        entries: ["operators.",
            "expressions.",
            "comparison operators.",
            "None of the above."],
        answer: 0
    },
    {
        text: "In JavaScript, the expression x!=y returns false if:",
        entries: ["the variables are equal.",
            "x is less than y.",
            "the variables are not equal.",
            "None of the above."],
        answer: 0
    },
    {
        text: "In JavaScript, which of the following is a logical operator?",
        entries: ["|",
            "&&",
            "%",
            "/"],
        answer: 1
    },
    {
        text: "When you want to use JavaScript to manipulate the browser window, the browser window's JavaScript object name is:",
        entries: ["Frame",
            "Document",
            "Window",
            "browser_window"],
        answer: 2
    },
    {
        text: "Alert(message), close() and reset() are JavaScript:",
        entries: ["Objects",
            "Methods",
            "Properties",
            "commands"],
        answer: 1
    },
    {
        text: "When you want to use JavaScript to manipulate the currently displayed Web page, the Web page's JavaScript object name is:",
        entries: ["Frame",
            "Document",
            "Window",
            "browser_window"],
        answer: 1
    },
    {
        text: "In JavaScript, which of the following is NOT an assignment operator?",
        entries: ["+=",
            "||",
            "*=",
            "="],
        answer: 1
    },
    {
        text: "In JavaScript, what would be the proper form of address in the object hierarchy for the second element in a form called 'info'?",
        entries: ["document.info.elements[1]",
            "document.info.elements[2]",
            "document.forms.info.elements[2]",
            "info.elements[2]"],
        answer: 0
    },
    {
        text: "A named element in a JavaScript program that is used to store and retrieve data is a _____.",
        entries: ["Method",
            "assignment operator",
            "Variable",
            "string"],
        answer: 2
    },
    {
        text: "Which of the following is not true",
        entries: ["CSS is tightly integrated with the HTML structure.",
            "CSS is part of dynamic HTML.",
            "CSS stand for cascading style sheet.",
            "CSS is for design control of the Web page appearance."],
        answer: 0
    },
    {
        text: "To define a style sheet, you need to",
        entries: ["specify each property and its corresponding value.",
            "associate property-value pairs to dedicated HTML tag(s).",
            "Both A and B.",
            "None of the above."],
        answer: 2
    },
    {
        text: "Which of the following is a valid style definition format",
        entries: ["<SPAN STYLE='property-value pair(s)'>... </SPAN>",
            "<STYLE>... </STYLE>",
            "Both A and B.",
            "None of the above."],
        answer: 2
    },
    {
        text: "For defining a spacing property in a style sheet, which of the following is not true",
        entries: ["margin-top: 50px",
            "text-indent: 10px",
            "padding-right: 100px",
            "position white-space: normal"],
        answer: 3
    },
    {
        text: "Which HTML tag is used to define an embedded style sheet?",
        entries: ["<script>",
            "<style>",
            "<css>",
            "<stylesheet>"],
        answer: 1
    },
    {
        text: "The introduction of CGI scripts changed the way that the Web was used because:",
        entries: ["of the ability to maintain customer databases.",
            "customers acquired the ability to locate and purchase merchandise online.",
            "it allows computer users to access a company's customer support database.",
            "all of the above."],
        answer: 3
    },
    {
        text: "In an HTML form, the correct syntax for creating an input box named 'Phone' that is 15 characters in length is:",
        entries: ["<input type='text' name= 'Phone 15'>",
            "<input type='text' size= '15'>",
            "<input type='text' name= 'phone' size= '15'>",
            "none of the above."],
        answer: 2
    },
    {
        text: "In a form, if you want users to select only one option out of many, use:",
        entries: ["check boxes.",
            "radio buttons.",
            "text boxes.",
            "either a or b."],
        answer: 1
    },
    {
        text: "In HTML, you use a button on a form to:",
        entries: ["run a program.",
            "submit a form to a server.",
            "reset a form to its original state.",
            "all of the above."],
        answer: 3
    },
    {
        text: "Which is the correct CSS syntax?",
        entries: ["body {color: black}",
            "{body;color:black}",
            "body:color=black",
            "{body:color=black(body}"],
        answer: 0
    },
    {
        text: "Which HTML attribute is used to define inline styles?",
        entries: ["style",
            "font",
            "class",
            "styles"],
        answer: 0
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
    if (x == questions[questionNumber].answer){
        score++;

        if (questionNumber + 1 == questions.length){    
            endGame();
        }else{
            displayQuestion();
        }
        
    }
    else{
        $('body').append('<div class="alert">wrong</div>');
        $('.alert').fadeOut('slow')
        timerCount -= 10;
        displayQuestion();
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

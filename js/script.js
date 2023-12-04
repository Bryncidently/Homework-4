var button = document.querySelector(".button");
var questionContainer = document.querySelector(".questionContainer");
var questionTitle = document.querySelector(".questionTitle");
var optionContainer = document.querySelector(".optionContainer");
var container = document.querySelector(".container");
var displayTimer = document.querySelector(".displayTimer");
var finalScore = document.querySelector(".finalScore");
var fsh3 = finalScore.querySelector("h3");
var highScore = document.querySelector(".highScore");
var submitButton = document.querySelector(".submitButton");



//120 seconds because not everyone reads and comprehends fast
var secondsLeft = 120;
var score = 0;
var questionIndex = 0;
var savedUserData = [];


var questions = [ 
    {
        question: "Commonly used data types DO NOT include:",
        options: ["Strings", "Booleans", "Alerts", "Numbers"],
        correctAnswer: "Alerts"
    },

    {
        question: "The consition in an if/else statement is enclosed with ________.",
        options: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
        correctAnswer: "Parenthesis"
    },

    {
        question: "Arrays in JavaScript can be used to store:",
        options: ["Numbers and Strings", "Other Arrays", "Booleans", "All of the Above"],
        correctAnswer: "All of the Above"
    },

    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: ["Commas", "Curly Brackets", "Quotes", "Parenthesis"],
        correctAnswer: "Quotes"
    }
];

button.addEventListener("click", function(event) {
    event.stopPropagation();
    startQuiz();
    
   
  });

//What starts it all
function startQuiz() {
        startTimer();
        displayNextQuestion();
        container.classList.add("hide");
        questionContainer.classList.remove("hide");
       
}


//checks the answer
function checkAnswer() {
    if (questions[questionIndex].correctAnswer === this.dataset.value) {
        score += 5; //+5 for the right answer
        questionIndex++;
        alert("Correct! Your current score is: " + score);
        displayNextQuestion();
    } else {
        score -= 5; //-5 for the wrong answer
        alert("Wrong! You lose 10 seconds and 5 points!");
        reduceTime();
        alert("Your current score is: " + score);
    } 
    
}


function displayNextQuestion() {
   
    if (questionIndex < questions.length) {
     questionTitle.textContent = questions[questionIndex].question;
     optionContainer.textContent = "";
    for (let i = 0; i < questions[questionIndex].options.length; i++) {
        var optionButton = document.createElement("button");
        optionButton.textContent = questions[questionIndex].options[i];
        optionButton.setAttribute("data-value", questions[questionIndex].options[i]);
        optionButton.addEventListener("click", checkAnswer);
        optionContainer.appendChild(optionButton);
        }
    }  else {
        
        displayFinalScore();  
    } 

    }
    
    

//starts timer
function startTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        displayTimer.textContent = secondsLeft + " seconds left.";

        if (secondsLeft <= 0) {
            displayTimer.textContent = "Out of Time! Your final score is: " + score;
            clearInterval(timerInterval);
        }
    }, 1000);
}


  //Reduces time if the wrong answer is selected
function reduceTime() {
    secondsLeft -= 10;
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }
}

//Gives the final score page
function displayFinalScore() {
    questionContainer.classList.add("hide");
    finalScore.classList.remove("hide");
    fsh3.textContent = ("Your final score is: " + score);
    
}

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveInitials();
    
});

//saves to local storage
function saveInitials() {
    var initialsInput = document.getElementById("initials");
    var userInitials = initialsInput.value;

  
    if (userInitials !== "") {
        
        //console.log(savedUserData);


        //check local storage to see if any data exists
        var storage = localStorage.getItem("userInitials", userInitials);
        //if yes, get it and store it in savedUserDataArray
        if(storage){
            storage = JSON.parse(storage);
            //console.log(storage);
            savedUserData = storage;
        }
        //push new user data onto that array
        savedUserData.push({user: userInitials, score: score});
        //shove that back into local storage
        var dataStr = JSON.stringify(savedUserData);
        localStorage.setItem("userInitials", dataStr);
        //when function is run send the userinitals on down!
        displayHighScore(userInitials);
        
    } else {
        alert("Please enter your initials before submitting.");
    }
}

function displayHighScore() {
    //console.log('to display', savedUserData)
    if (savedUserData) {
        questionContainer.classList.add("hide");
        finalScore.classList.add("hide");
        highScore.classList.remove("hide");
        for (let i = 0; i < savedUserData.length; i++) {
            var userScores = document.createElement("p");
            userScores.textContent = savedUserData[i].user + " - " + savedUserData[i].score
            highScore.appendChild(userScores);
            }
    } 
   
}








var button = document.querySelector(".button");
var questionContainer = document.querySelector(".questionContainer");
var questionTitle = document.querySelector(".questionTitle");
var optionContainer = document.querySelector(".optionContainer");
var container = document.querySelector(".container");
var displayTimer = document.querySelector(".displayTimer");


var secondsLeft = 120;



var score = 0;
var questionIndex = 0;


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


function startQuiz() {
        startTimer();
        displayNextQuestion();
        container.classList.add("hide");
        questionContainer.classList.remove("hide");
       
}


function checkAnswer() {
    //console.log(this.dataset.value)
    if (questions[questionIndex].correctAnswer === this.dataset.value) {
        questionIndex++;
        displayNextQuestion();}
        else {
            reduceTime();
        }
       
        
    }


function displayNextQuestion() {
    questionTitle.textContent = questions[questionIndex].question;
    optionContainer.textContent = "";
    for (let i = 0; i < questions[questionIndex].options.length; i++) {
        var optionButton = document.createElement("button");
        optionButton.textContent = questions[questionIndex].options[i];
        optionButton.setAttribute("data-value", questions[questionIndex].options[i]);
        optionButton.addEventListener("click", checkAnswer);
        optionContainer.appendChild(optionButton);

        }

}


function startTimer() {
    
    var timerInterval = setInterval(function() {
      secondsLeft--;
      displayTimer.textContent = secondsLeft + " seconds left.";
  
      if(secondsLeft === 0) {
        displayTimer.textContent = "Out of Time!"
        clearInterval(timerInterval);
       
      } 
    }, 1000);
  }

function reduceTime() {
    secondsLeft -= 10;
    if (secondsLeft < 0) {
        secondsLeft = 0;
    }
}
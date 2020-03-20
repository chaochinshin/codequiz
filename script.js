  //  Assignment Code

  var score = 0
  var questions = [
    
    {
      questionTitle : "When a user views a page containing a JavaScript program, which machine actually executes the script?",
      choices: [
              {text: "(A) The User’s machine running a Web browser", option:"A"},
                {text: "(B) The Web server", option:"B"},
                {text: "(C) A central machine deep within Netscape’s corporate offices", option:"C"},
                {text: "(D) None of the above", option: "D"}
    ],
      correctChoice: "A"
    },
    {
      questionTitle : "______ JavaScript is also called client-side JavaScript.",
      choices: [
        {text: "(A) Microsoft", option:"A"},
        {text: "(B) Navigator", option:"B"},
        {text: "(C) LiveWire", option:"C"},
        {text: "(D) Native", option:"D"}
    ],
      correctChoice: 'B'
    },
    {
      questionTitle : "__________ JavaScript is also called server-side JavaScript.",
      choices: [
        {text: "(A) Microsoft", option:"A"},
        {text: "(B) Navigator", option:"B"},
        {text: "(C) LiveWire", option:"C"},
        {text: "(D) Native", option:"D"}
      ],
      correctChoice: 'C'
    },
    {
      questionTitle: "What are variables used for in JavaScript Programs?",
      choices: [
        {text: "(A) Storing numbers, dates, or other values", option:"A"},
        {text: "(B) Varying randomly", option:"B"},
        {text: "(C) Causing high-school algebra flashbacks", option:"C"},
        {text: "(D) None of the above", option:"D"}
      ],
      correctChoice: 'A'
    },

    ];



  // variables to keep track of quiz state
  var currentQuestionIndex = 0;
  var secondsLeft = questions.length * 5;
  var timerInterval;

  // variables to reference DOM elements
  var startBtn = document.getElementById("start"); //querySelector("#start")
  var timeEl = document.querySelector(".time");  //getElementsByClassName
  var questionsEl = document.getElementById("questions");
  var choicesEl = document.getElementById("choices");
  var submitBtn = document.getElementById("submit");
  var initialsEl = document.getElementById("initials");
  var feedbackEl = document.getElementById("feedback");
  var counter = document.getElementById("counter");

  var progress = document.getElementById("progress");
  var scoreContainer = document.getElementById("scoreContainer");

  //TODO add list of questions
  var choiceA = document.getElementById("A");
  var choiceB = document.getElementById("B");
  var choiceC = document.getElementById("C");
  var choiceD = document.getElementById("D");

  function startQuiz() {
    // hide start screen
  document.getElementById("start-screen").style.display="none";

    //storing value 0 to a place call "correctanswer"
  window.localStorage.setItem("correctanswer", 0);

    // **un-hide questions section

    // start timer
  timerInterval = setInterval("clockTick()", 1000);
  
  // **show starting time

  // to retrieve question
  getQuestion();
  }

  function renderQuestion(){
    let q = questions[currentQuestionIndex];
    questions = "<p>" + q.questions + "</p>";
    choiceA = q.choiceA;
    choiceB = q.choiceB;
    choiceC = q.choiceC;
    choiceD = q.choiceD;
  }

  function getQuestion() {
    // get current question object from array
    currentQuestion = questions[currentQuestionIndex];

    // update title with current question
    var questionTitle = document.getElementById("question-title");
    questionTitle.innerText = currentQuestion.questionTitle;

    // clear out any old question choices
    document.getElementById("choices").innerHTML = "";

    //display question, it is CSS
    document.getElementById("quiz").style.display = "block";

    
    // **questions to see how many answers correct

    // loop over choices
    for ( var i=0; i < currentQuestion.choices.length; i++)
    {
      // create new button for each choice
      choicebutton = document.createElement("button");
      choicebutton.appendChild(document.createTextNode(currentQuestion.choices[i].text));
      choicebutton.setAttribute("data-option",currentQuestion.choices[i].option);

      // attach click event listener to each choice
      choicebutton.onclick = questionClick;

      // display on the page
      document.getElementById("choices").append(choicebutton);
    }
  }

  function questionClick(e) {
    // check if user guessed wrong and penalize time if incorrect
    // display new time on page
    currentQuestion = questions[currentQuestionIndex];
    clickQuestion = e.target.getAttribute("data-option");
    if (clickQuestion == currentQuestion.correctChoice) {
      window.localStorage.setItem("correctanswer",parseInt(window.localStorage.getItem("correctanswer"))+1);
      document.getElementById("correct").innerText = "Correct!";
    }
    else  {
      document.getElementById("correct").innerText = "Wrong!";
      secondsLeft--;
    }
    // else show correct feedback


    // move to next question
    currentQuestionIndex++;

      // check if we've run out of questions
    if (currentQuestionIndex < questions.length) {
      getQuestion();
    }
    else {
      quizEnd();
    }
   }

  function quizEnd() {
    // stop timer
    clearInterval(timerInterval);

    // hide questions section
    document.getElementById("quiz").style.display = "none";
    
    // show end screen
    document.getElementById("end-screen").classList.remove("hide");

    if(secondsLeft === 0) {
      document.getElementById("final-score").innerText = "Timed Out";    
    }
    else {
      // show final score
      document.getElementById("final-score").innerText = window.localStorage.getItem("correctanswer");
    }
  }

  function clockTick() {
    // update time
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds.";
        
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
      quizEnd();
    }
  }


    function sendMessage() {
      timeEl.setAttribute("style", "display:none");
    
    /*  var imgEl = document.createElement("img");
    
      imgEl.setAttribute("src", "images/image_1.jpg");
      mainEl.appendChild(imgEl);
    */
    }

  function saveHighscores() {
    // get value of input box
    var initials = document.getElementById("initials").value;
    var scoreObject = JSON.parse(window.localStorage.getItem("highscores"));

    // make sure value wasn't empty
    if (initials !== "") {

      // get saved scores from localstorage, or if not any, set to empty array
      if (!scoreObject || scoreObject.length == 0) {

        // format new score object for current user
        scoreObject = [{initials: initials, score:window.localStorage.getItem("correctanswer")}];     
      }
      else{
        scoreObject.push({initials: initials, score:window.localStorage.getItem("correctanswer")});
      }
      
      // save to localstorage
      window.localStorage.setItem("highscores",JSON.stringify(scoreObject));

      // redirect to next page
      window.location.replace("./highscores.html");
    }
  }

  // user clicks button to submit initials
  document.getElementById("submit").addEventListener("click", saveHighscores);

  // user clicks button to start quiz
  startBtn.addEventListener("click", startQuiz);


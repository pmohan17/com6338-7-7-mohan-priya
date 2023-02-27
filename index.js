// Your code here
//Create questions for quiz
var questionsArr = [
    {question: 'Where was the first World Cup held?', 
    answer: 'Uraguay',
    options: [
        'Brazil',
        'Spain',
        'Uraguay',
        'South Africa',
                 ]
    },
    {question: 'Which country’s soccer team helped secure a truce to the nation’s civil war in 2006?',
    answer: 'Ivory Coast',
    options: [
        'Liberia',
        'Ivory Coast',
        'Sudan',
        'Afghanistan',
    ]
    },
    {question: 'Which country won the first women’s World Cup?',
    answer: 'United States',
    options: [
        'Brazil',
        'United States',
        'Australia',
        'South Africa',
    ]
    },
    {question: 'What was the largest margin of victory in an international soccer match?',
    answer: '31-0',
    options: [
        '31-0',
        '53-4',
        '20-0',
        '40-10',
    ]
    },
    {question: 'In which season was the European Cup rebranded as the Champions League?',
    answer: '1992/93',
    options: [
        '2000/01',
        '1987/88',
        '2006/07',
        '1992/93',
        ]
        },
    {question: 'Which player scored the “Hand of God” goal in a match of the 1986 World Cup?',
    answer: 'Diego Maradona',
    options: [
        'Diego Maradona',
        'Gary Lineker',
        'Pele',
        'Emilio Butragueno',
        ]
        },
]
//What variables will I need
//What text elements do I need to create
var quiz = document.querySelector('#quiz')
var timer = document.querySelector('#timer')
var timer = document.createElement('p')
var question = document. createElement('p')
var score
var finalScore
var finalScoreEl = document.createElement('p')
var currentQuestion 
var answerBtn = document.createElement('button')
var timeRemaining
var timerEl

//Need a working timer

function startTimer(){
    timerEl = setInterval(function() {
      timeRemaining--
      if (timeRemaining > 0){
        timer.textContent = timeRemaining
      } else {
        clearInterval(timerEl)
        currentQuestion++
        if(currentQuestion < questionsArr.length){
          getQuestion()
        } else {
          endQuiz()
        }
      }
    }, 1000)
  }
  
//Need to start game
function startQuiz(){
  score = 0
  currentQuestion = 0
  quiz.innerHTML = ''
  finalScore = localStorage.getItem('previous-score')
  if (finalScore){
    finalScoreEl.textContent = 'Score: ' + finalScore
    quiz.appendChild(finalScoreEl)
  }
  answerBtn.id = 'start-quiz'
  answerBtn.textContent = "Start Quiz"
  quiz.appendChild(answerBtn)
}

//Need the quiz game to function
function getQuestion(){
timeRemaining = 30
quiz.innerHTML = ""
  var questionAsked = questionsArr[currentQuestion]
  question.textContent = questionAsked.question
  quiz.appendChild(question)
  var choices = document.createElement('div')
  choices.id = 'choices'
  quiz.appendChild(choices)
  questionAsked.options.forEach(function(choice){
    var choiceBtn = document.createElement('button')
    choiceBtn.textContent = choice
    choices.appendChild(choiceBtn)
  })
  timer.id = 'timer'
  timer.textContent = timeRemaining
  quiz.appendChild(timer)
  startTimer()
}
quiz.onclick = function(e) {
    if (e.target.id === 'start-quiz') {
      getQuestion()
    } else if (e.target.parentElement.id === 'choices'
    && e.target.tagName === 'BUTTON'){
      if(e.target.textContent === questionsArr[currentQuestion].answer){
        score++
      }
      clearInterval(timerEl)
      currentQuestion++
      if (currentQuestion < questionsArr.length){
        getQuestion()
      } else {
        endQuiz()
      }
    }
  }

//When quiz ends need the score
function endQuiz() {
  quiz.innerHTML = ""
  var percentage = Math.round(score / questionsArr.length * 100) + '%'
  localStorage.setItem('previous-score', percentage)
  startQuiz()
}

startQuiz()

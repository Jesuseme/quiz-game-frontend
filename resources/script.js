const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    {
        question: "What is HTML:",
        answers: [
            { text: "HyperText Markup language", correct: true}, 
            {text:"HyperText Markup logging", correct:false},
            {text:"HypeText Makeup language", correct: false}  
        ] 
    },

    {
        question:"Who is making the web standards:" ,
        answers: [
            {text:"Google", correct:false},
            {text:"Yahoo", correct:false},
            {text:"World Wide Web Consortium", correct:true},   
        ]
    },

    {
        question:"What is CSS: " ,
        answers: [
            {text:"Condensing Social Services", correct:false},
            {text:"Cascading Style Sheets", correct:true},
            {text:"Closing Server Services", correct:false},   
        ]
    },

    {
        question:"What is PHP: " ,
        answers: [
            {text:"Plain Hypertext Protocol", correct:false},
            {text:"Hypertext Preprocessor", correct:true},
            {text:"Progressing Hemoraging protocol", correct:false},   
        ]
    },

    {
        question:"What is SQL: " ,
        answers: [
            {text:"Server Query Language", correct:false},
            {text:"Sequence queueing Logger", correct:false},
            {text:"Structured Query Language", correct:true},   
        ]
    },
 
    {
        question:"Javascript is java for web: ", 
        answers: [
            {text:"True", correct:false},
            {text:"False", correct:true},
            {text:"All of the above", correct:false},   
        ]
    }
 
];
 
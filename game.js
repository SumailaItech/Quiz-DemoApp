const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressBarText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader =document.getElementById('loader');
const game = document.getElementById('game')

let currentQuestion = {};
let acceptingAnswer = false;
let score =0;
let questionCounter = 0;
let availableQuestions =[];
  

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple").then(res =>{
    return res.json();
}).then(loadedQuestions =>{
    //questions = loadedQuestions;
    console.log(loadedQuestions.results);
   questions = loadedQuestions.results.map( loadedQuestion =>{
        const formatterdQuestion ={
            question:loadedQuestion.question
        };

        const answerChoices =[...loadedQuestion.incorrect_answers];
        formatterdQuestion.answer = Math.floor(Math.random() *3 ) +1;
        answerChoices.slice(formatterdQuestion.answer -1,0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) => {
            formatterdQuestion["choice" +(index +1)] = choice;
        });
    return formatterdQuestion;
    });
   
    startGame();
}).catch(err =>{
    console.error(err);
})
// Constants

const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;

startGame = ()=>{
    questionCounter = 0;
    score =0;
    availableQuestions = [...questions];
    
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = ()=>{

    if(availableQuestions.length ==0 || questionCounter >= MAX_QUESTION){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressBarText.innerText = `Questions ${questionCounter}/${MAX_QUESTION}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`;
    

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
   
    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswer = true;
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswer) return;

        acceptingAnswer = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if(classToApply == "correct"){
            increamentScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
      
       setTimeout(() =>{
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();   
    },1000)
         
    });
});

increamentScore = num =>{
    score +=num;
    scoreText.innerText = score;
};


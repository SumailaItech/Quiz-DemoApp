const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

// localStorage.setItem('highScores',JSON.stringify([]));
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

username.addEventListener('keyup', ()=>{
 saveScoreBtn.disabled = !username.value;
});

saveHighScore = e=>{
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5); 
    console.log(score);
};
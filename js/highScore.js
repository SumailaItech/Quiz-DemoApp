const highScoreList = document.getElementById('highScoreList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoreList.innerHTML = highScores.map(score =>{
//  return `<li class="high-score">${score.name}  -  ${score.score}</li>`;
return`
  <tr>
    <td>${score.name}</td>
    <td>${score.score}</td>
  </tr>
`;
}).join("");
function printHighscores() {
  // either get scores from localstorage or set to empty array
var score = JSON.parse(window.localStorage.getItem("highscores"));
console.log(window.localStorage);

  // sort highscores by score property in descending order
  score.sort((a,b) =>(a.score<b.score)?1:-1);

for (var i = 0; i < score.length; i++)  {

var scoreline = document.createElement("p");
scoreline.appendChild(document.createTextNode(score[i].initials + ":" + score[i].score));
document.getElementById("scores").append(scoreline);
}

}
function goBack() {
  window.location.replace("./index.html");
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("goback").addEventListener("click", goBack);
document.getElementById("clear").addEventListener("click", clearHighscores);

printHighscores()

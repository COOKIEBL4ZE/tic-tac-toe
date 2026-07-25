const markbuttons = document.querySelectorAll(".mark-button");
const newroundbutton = document.querySelector("#next-round");
const resetScorebutton = document.querySelector("#delete");
const scoreX = document.querySelector("#scoreX")
const rounds =document.querySelector("#rounds")
const scoreO = document.querySelector("#scoreO")
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
newroundbutton.addEventListener("click", startnewround)

let board = ["", "", "", "", "", "", "", "", ""];
let piecehistory = {
  X: [],
  O: [],
};
let scoreboard = {
  X:0,
  O:0,
  rounds:0
}
let currentplayer = "X";
function handlecellclick(event) {
  const markbutton = event.target;
  const positon = Number(markbutton.dataset.cell);

  makeamove(positon);
}

function makeamove(positon) {
  if (board[positon] !== "") return;
  board[positon] = currentplayer;
  piecehistory[currentplayer].push(positon);
  recreateboard();
  checkGameResults();
}

function recreateboard() {
  markbuttons.forEach((button, positon) => {
    const mark = board[positon];
    button.textContent = mark;
  });
}

function switchplayer() {
  if (currentplayer === "X") {
    currentplayer = "O";
  } else {
    currentplayer = "X";
  }
}
function checkGameResults() {
  const winningLine = findwinningline();
  console.log(currentplayer)
  if (winningLine) {
  console.log("winner ",currentplayer)

    scoreboard[currentplayer] = scoreboard[currentplayer] + 1
    scoreboard.rounds = scoreboard.rounds + 1
    console.log('update scores', scoreboard)
    updatescoreboard()
    startnewround()
    return;
  }
  switchplayer();
}

function findwinningline() {
  let linehavesameplayer = false;
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a]) {
      if (board[a] === board[b])
        if (board[a] === board[c]) {
          linehavesameplayer = true;
        }
    }
    if (linehavesameplayer) {
      return line;
    }
  }
  return null;
}
function updatescoreboard() {
scoreO.textContent = scoreboard.O
scoreX.textContent = scoreboard.X
rounds.textContent = scoreboard.rounds
}

function handleResetClick(event) {
  scoreboard = {
  X:0,
  O:0,
  rounds:0
}
startnewround()
}

function startnewround() {
  board =["", "", "", "", "", "", "", "", ""];
  currentplayer= 'X'
piecehistory = {
  X: [],
  O: [],
 } 
 markbuttons.forEach((markbutton) => {
    markbutton.textContent = "";
  });
}
markbuttons.forEach((markbutton) => {
  markbutton.addEventListener("click", handlecellclick);
});
resetScorebutton.addEventListener("click", handleResetClick);

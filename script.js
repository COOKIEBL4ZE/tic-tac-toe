const markbuttons = document.querySelectorAll(".mark-button");
const newroundbutton = document.querySelector("#next-round");
const resetScorebutton = document.querySelector("#delete");
const scoreX = document.querySelector("#scoreX")
const rounds =document.querySelector("#rounds")
const scoreO = document.querySelector("#scoreO")
const instruction = document.querySelector("#instruction")
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
let gameover = false;

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
  if (piecehistory[currentplayer].length ===3){
    const oldespieceposition = piecehistory[currentplayer].shift()
    board[oldespieceposition] = "" 
  }
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
    if (mark) {
      button.classList.add(mark.toLowerCase())
    }
  });
}

function switchplayer() {
  if (currentplayer === "X") {
    currentplayer = "O";
  } else {
    currentplayer = "X";
  }

function markoldestpiece() {
  markbuttons.forEach((button)=> {
    button.classList.remove("oldest")
  })
if (piecehistory[currentplayer].length ===3 && !gameover){
  const oldespieceposition = piecehistory[currentplayer][0]
markbuttons[oldespieceposition].classList.add("oldest")
}
}

  instruction.textContent = getturnmessage()
  markoldestpiece()
}


function getturnmessage() {
  const currentplayermoves = piecehistory[currentplayer].length
if (currentplayermoves === 3){
  return `player ${currentplayer}'s turn. Your oldest piece will move to the square you choose`
  }
  return `player ${currentplayer}'s turn`
}

function checkGameResults() {
  const winningLine = findwinningline();
  console.log(currentplayer)
  if (winningLine) {
finishround(`${currentplayer} wins this round!`, winningLine)
    scoreboard[currentplayer] = scoreboard[currentplayer] + 1
    scoreboard.rounds = scoreboard.rounds + 1
    console.log('update scores', scoreboard)
    updatescoreboard()
    return;
  }
  switchplayer();
}

function finishround(message, winningLine = []){
  gameover = true

  instruction.textContent = message

  markbuttons.forEach((button)=> {
    button.disabled = true;
  })
  winningLine.forEach((positon) => {
    markbuttons[positon].classList.add('win');
  })
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
updatescoreboard()
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
    markbutton.disabled = false
    markbutton.classList.remove("x","o","oldest","win")
  });
}
markbuttons.forEach((markbutton) => {
  markbutton.addEventListener("click", handlecellclick);
});
resetScorebutton.addEventListener("click", handleResetClick);

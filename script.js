const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");

const COMPUTER = "X";
const PLAYER = "O";
let board = Array(9).fill(null);
let gameOver = false;
let firstCorner = null;

const corners = [0, 2, 6, 8];
const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function drawBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, i) => {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.textContent = value || "";
    cell.disabled = Boolean(value) || gameOver;
    cell.addEventListener("click", () => playerMove(i));
    boardElement.appendChild(cell);
  });
}

function getWinner(state) {
  for (const [a,b,c] of winningLines) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) return state[a];
  }
  return null;
}

function openSpots(state) {
  return state.map((v,i) => (v === null ? i : null)).filter((v) => v !== null);
}

function computerFirstMove() {
  firstCorner = corners[Math.floor(Math.random() * corners.length)];
  board[firstCorner] = COMPUTER;
}

function oppositeCorner(corner) {
  return {0:8, 2:6, 6:2, 8:0}[corner];
}

function cornerNotAdjacentToPlayer(playerIndex) {
  return corners.find((c) => c !== firstCorner && c !== playerIndex && board[c] === null) ?? openSpots(board)[0];
}

function computerMove() {
  if (gameOver) return;

  const playerCenter = board[4] === PLAYER;
  const takenCount = board.filter(Boolean).length;

  if (takenCount === 2) {
    if (playerCenter) {
      const opposite = oppositeCorner(firstCorner);
      if (board[opposite] === null) {
        board[opposite] = COMPUTER;
        return;
      }
    } else {
      const pick = cornerNotAdjacentToPlayer(board.indexOf(PLAYER));
      board[pick] = COMPUTER;
      return;
    }
  }

  const winsNow = findFinish(COMPUTER);
  if (winsNow !== null) {
    board[winsNow] = COMPUTER;
    return;
  }

  const blocks = findFinish(PLAYER);
  if (blocks !== null) {
    board[blocks] = COMPUTER;
    return;
  }

  const fallback = openSpots(board)[0];
  if (fallback !== undefined) board[fallback] = COMPUTER;
}

function findFinish(mark) {
  for (const [a,b,c] of winningLines) {
    const line = [board[a], board[b], board[c]];
    if (line.filter((v) => v === mark).length === 2 && line.includes(null)) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      return c;
    }
  }
  return null;
}

function lockResult() {
  gameOver = true;
  statusElement.textContent = "Game Over. Computer Wins.";
}

function playerMove(index) {
  if (board[index] || gameOver) return;
  board[index] = PLAYER;
  computerMove();
  drawBoard();
  lockResult();
}

function resetGame() {
  board = Array(9).fill(null);
  gameOver = false;
  computerFirstMove();
  drawBoard();
  statusElement.textContent = "Game Over. Computer Wins.";
}

resetButton.addEventListener("click", resetGame);
resetGame();

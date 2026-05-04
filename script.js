const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");

const HUMAN = "X";
const AI = "O";
let board = Array(9).fill(null);
let gameOver = false;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function drawBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, idx) => {
    const button = document.createElement("button");
    button.className = "cell";
    button.textContent = value || "";
    button.disabled = Boolean(value) || gameOver;
    button.addEventListener("click", () => humanMove(idx));
    boardElement.appendChild(button);
  });
}

function winner(state) {
  for (const [a, b, c] of WIN_LINES) {
    if (state[a] && state[a] === state[b] && state[a] === state[c]) return state[a];
  }
  return null;
}

function available(state) {
  return state.map((v, i) => (v ? null : i)).filter((v) => v !== null);
}

function bestMove(state) {
  const moves = available(state);

  for (const i of moves) {
    const next = [...state];
    next[i] = AI;
    if (winner(next) === AI) return i;
  }

  for (const i of moves) {
    const next = [...state];
    next[i] = HUMAN;
    if (winner(next) === HUMAN) return i;
  }

  if (state[4] === null) return 4;

  const oppositeCornerPairs = [
    [0, 8],
    [2, 6],
  ];
  for (const [a, b] of oppositeCornerPairs) {
    if (state[a] === AI && state[b] === null) return b;
    if (state[b] === AI && state[a] === null) return a;
  }

  let bestScore = -Infinity;
  let bestIndex = moves[0];

  for (const move of moves) {
    const next = [...state];
    next[move] = AI;
    const score = minimax(next, false);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = move;
    }
  }

  return bestIndex;
}

function minimax(state, maximizing) {
  const win = winner(state);
  if (win === AI) return 10;
  if (win === HUMAN) return -10;
  if (!available(state).length) return 0;

  if (maximizing) {
    let best = -Infinity;
    for (const move of available(state)) {
      const next = [...state];
      next[move] = AI;
      best = Math.max(best, minimax(next, false));
    }
    return best;
  }

  let best = Infinity;
  for (const move of available(state)) {
    const next = [...state];
    next[move] = HUMAN;
    best = Math.min(best, minimax(next, true));
  }
  return best;
}

function humanMove(i) {
  if (board[i] || gameOver) return;
  board[i] = HUMAN;
  evaluateState();
  if (!gameOver) {
    const aiIndex = bestMove(board);
    board[aiIndex] = AI;
    evaluateState();
  }
  drawBoard();
}

function evaluateState() {
  const win = winner(board);
  if (win) {
    gameOver = true;
    statusElement.textContent = win === HUMAN ? "You won." : "AI won.";
    return;
  }

  if (!available(board).length) {
    gameOver = true;
    statusElement.textContent = "Draw. No open lines left.";
    return;
  }

  statusElement.textContent = "Your turn: play as X.";
}

resetButton.addEventListener("click", () => {
  board = Array(9).fill(null);
  gameOver = false;
  statusElement.textContent = "Your turn: play as X.";
  drawBoard();
});

drawBoard();

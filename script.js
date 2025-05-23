const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const playAgainBtn = document.getElementById("play-again");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Initialize the game board
function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  popup.classList.add("hidden");

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// Check for a winning condition
function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    );
  });
}

// Handle clicks on cells
function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    showPopup(`🎉 Player ${currentPlayer} wins!`);
  } else if (!gameState.includes("")) {
    gameActive = false;
    showPopup("🤝 It's a draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Show the result popup
function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}

// Reset game from popup
function hidePopup() {
  popup.classList.add("hidden");
  createBoard();
}

// Event listeners
resetBtn.addEventListener("click", createBoard);
playAgainBtn.addEventListener("click", hidePopup);

// Start game on page load
createBoard();

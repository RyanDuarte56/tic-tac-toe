const grid = document.getElementById("grid");

// Grid creation
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

let isPlayerX = true;
let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

function handleClick(event) {
  const cell = event.target;
  
  // Verifies if the cell is already filled
  if (cell.textContent !== "") {
    return;
  }

  // Fills the cell based on the current player
  cell.textContent = isPlayerX ? "X" : "O";

  checkGameOver();

  // Changes player if the game is not over
  if (gameOver) {
    resetGame();
  } else {
    isPlayerX = !isPlayerX;
  }
}

function checkGameOver() {
  const board = Array.from(cells).map(cell => cell.textContent);
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Main diagonal
    [2, 4, 6]  // Secondary diagonal
  ];

  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    
    if (board[a] === board[b] &&
        board[b] === board[c] &&
        board[a] !== "") {
          alert(`Player ${board[a]} wins!`);
          gameOver = true;
          return;
        }
  });
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
  })

  isPlayerX = true;
  gameOver = false;
}
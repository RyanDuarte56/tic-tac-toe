const turnMessage = document.getElementById("turn-message");
const winMessage = document.getElementById("win-message");
const gameOverDiv = document.getElementById("game-over-div");
const newGameButton = document.getElementById("new-game-button");
const grid = document.getElementById("grid");

// Criação do grid
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell", "hover");
  grid.appendChild(cell);
}

const cells = document.querySelectorAll(".cell");

let isPlayerX = true;
let gameOver = false;

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

newGameButton.addEventListener("click", resetGame);

function handleClick(event) {
  const cell = event.target;
  
  // Verifica se a célula já está preenchida ou o jogo acabou
  if (cell.textContent !== "" || gameOver) {
    return;
  }

  // Preenche a célula com base no jogador atual
  cell.textContent = isPlayerX ? "X" : "O";

  checkGameOver();

  // Alterna o jogador caso o jogo não tenha acabado
  if (!gameOver) {
    isPlayerX = !isPlayerX;
    turnMessage.textContent = isPlayerX ? "Turn: X" : "Turn: O";
  }
}

function checkGameOver() {
  const board = Array.from(cells).map(cell => cell.textContent);
  const winningCombinations = [
    [0, 1, 2], // Linha superior
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha inferior
    [0, 3, 6], // Coluna da esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna da direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
  ];

  winningCombinations.forEach(combination => {
    const [a, b, c] = combination;
    
    if (board[a] === board[b] &&
        board[b] === board[c] &&
        board[a] !== "") {
          winMessage.textContent = `Player ${board[a]} wins!`;
          combination.forEach(index => {
            cells[index].classList.add("winner");
          });
          cells.forEach(cell => {
            cell.classList.remove("hover");
          })
          gameOverDiv.style.display = "block";
          gameOver = true;
          return;
        }
  });

  // Se alguma célula ainda não estiver preenchida, o jogo não acabou. Se não teve um vencedor e todas as células foram preenchidas, foi um empate
  if (board.some(content => content === "")) {
    return;
  }

  cells.forEach(cell => {
    cell.classList.remove("hover");
  })
  winMessage.textContent = `Draw!`;
  gameOverDiv.style.display = "block";
  gameOver = true;
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
    cell.classList.add("hover");
  })

  isPlayerX = true;
  gameOver = false;
  gameOverDiv.style.display = "none";
  turnMessage.textContent = "Turn: X";
}
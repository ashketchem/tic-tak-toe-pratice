const cells = document.querySelectorAll('.cell');
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let currentPlayer = 'X';
let xScore = 0; // Initialize xScore
let oScore = 0; // Initialize oScore

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
})

function handleClick(event) {
   const index = event.target.dataset.index;
   if (board[index] !== "" || gameOver) {
     return;
   } else {
      board[index] = currentPlayer;
      event.target.textContent = currentPlayer;
      checkWin();
      switchPlayer();
   }
}

function switchPlayer() {
   if (currentPlayer === 'X') {
     currentPlayer = 'O';
   } else {
     currentPlayer = 'X';
   }
}

function checkWin() {
   const winningCombinations = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
   ];

   for (let i = 0; i < winningCombinations.length; i++) {
     const [a, b, c] = winningCombinations[i];
     if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
       gameOver = true;
       alert(`${currentPlayer} wins!`);
       if (currentPlayer === 'X') {
         xScore += 1; // Increment xScore only if X wins
       } else {
         oScore += 1; // Increment oScore only if O wins
       }
       score();
reset
       break;
     } 
   }

   if (!gameOver && board.every(cell => cell !== "")) {
     gameOver = true;
     alert("It's a tie!");
     xScore += 0.5; // Increment both scores for a tie
     oScore += 0.5;
     score();
    resetGame();
   } 
}

function score() {
  let scoreDisplay = document.createElement('div'); // Create a div element to display the score
  scoreDisplay.textContent = `Score: X won = ${xScore} and O won = ${oScore}`;
  document.body.appendChild(scoreDisplay); // Append the score display to the body
}

let reset = document.querySelector(`.reset`)
reset.addEventListener('click', resetGame);

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameOver = false;
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = "";
  });
}


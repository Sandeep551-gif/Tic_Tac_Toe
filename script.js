const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
const winScreen = document.querySelector('.win-screen');
const winMessage = document.getElementById('win-message');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell) => {
cell.addEventListener('click', cellClick);
});

resetButton.addEventListener('click', resetGame);

function cellClick(e) {
    const cell = e.target;
    const index = cell.id;

    if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';

    if (checkWin(currentPlayer)) {
    message.textContent = '';
    winMessage.textContent = `Player ${currentPlayer} wins!`;
    winScreen.style.display = 'block';
    gameActive = false;
    } else if (isBoardFull()) {
    message.textContent = '';
    winMessage.textContent = "It's a draw!";
    winScreen.style.display = 'block';
    gameActive = false;
    } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    }
    }
}

function checkWin(player) {
for (const combo of winningCombos) {
    if (
    board[combo[0]] === player &&
    board[combo[1]] === player &&
    board[combo[2]] === player
    ) {
    cells[combo[0]].style.background = 'green';
    cells[combo[1]].style.background = 'green';
    cells[combo[2]].style.background = 'green';
    return true;
    }
}
return false;
}

function isBoardFull() {
    return board.every((cell) => cell !== '');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = "Player X's turn";
    cells.forEach((cell) => {
    cell.textContent = '';
    cell.style.background = '';
});
winScreen.style.display = 'none';
}

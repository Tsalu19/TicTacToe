const celda= document.getElementsByClassName ("cell")
    console.log(celda)
const Reset = document.getElementById ("Reset")
const Notification = document.getElementById ("Notification")
const Ganadas = document.getElementById ("Ganadas")
const Perdidas = document.getElementById ("Perdidas")
const Empates = document.getElementById ("Empates")

let ganadas = 0;
let perdidas = 0;
let empates = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

// Cargar el estado del juego desde localStorage si existe
function loadGameState() {
    const savedBoard = localStorage.getItem('ticTacToeBoard');
    const savedPlayer = localStorage.getItem('ticTacToePlayer');
    const savedGameOver = localStorage.getItem('ticTacToeGameOver');

    if (savedBoard) {
        gameBoard = JSON.parse(savedBoard);
    }

    if (savedPlayer) {
        currentPlayer = savedPlayer;
    }

    if (savedGameOver === 'true') {
        isGameOver = true;
    }

    updateBoard();
}

// Guardar el estado del juego en localStorage
function saveGameState() {
    localStorage.setItem('ticTacToeBoard', JSON.stringify(gameBoard));
    localStorage.setItem('ticTacToePlayer', currentPlayer);
    localStorage.setItem('ticTacToeGameOver', isGameOver.toString());
}


// Función para actualizar el tablero en la interfaz
function updateBoard() {
    celda.forEach(( cell, index) => {
        cell.textContent = gameBoard[index] !== '' ? gameBoard[index] : '';
    });
}

// Asignar los eventos de clic a las celdas
for (let index = 0; index < celda.length; index++) {
    celda[index].addEventListener('click', function () {
        celda[index].innerHTML = "X"
    })
    
}

// Función para manejar un clic en una celda
function handleClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (gameBoard[index] !== '' || isGameOver || currentPlayer === 'O') return;  // Si la celda ya está ocupada, el juego terminó o es el turno de la computadora, no hacer nada
    
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner()) {
        Notification.textContent = `¡Jugador ${currentPlayer} gana!`;
        isGameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        Notification.textContent = '¡Empate!';
        isGameOver = true;
    } else {
        currentPlayer = 'O';  // Cambiar al turno de la computadora
        Notification.textContent = `Es el turno de la computadora (O)`;
        computerMove();  // Hacer que la computadora realice su movimiento
    }

    saveGameState();  // Guardar el estado después de cada jugada
}
// Función para comprobar si hay un ganador
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function computerMove() {
    let valor = Math.floor(Math.random() * 9);
}


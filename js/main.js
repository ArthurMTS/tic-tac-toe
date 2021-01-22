const displayController = (function() {
  const choose = document.querySelector('#choose-div');
  choose.style.display = "flex";
  const game = document.querySelector('#game-div');
  const start = document.querySelector('#choose-div button');
  start.addEventListener('click', renderGame);

  const grid = document.querySelectorAll('#gameboard button');
  const turn = document.querySelector('#main-header h2');

  const getGrid = () => grid;

  const displayPlayer = (player) => {
    turn.textContent = `${player.getName()}'s turn`;
  }

  const displayWinner = (player) => {
    const header = document.querySelector('#main-header');

    if (player === 'TIE') turn.textContent = `Well... that's a TIE!`;
    else turn.textContent = `Player ${player.getName()} win!`;

    const button = document.createElement('button');
    button.textContent = "Play Again";
    button.classList.add('btn');
    button.addEventListener('click', () => {
      choose.style.display = "flex";
      game.style.display = "none";

      gameBoard.cleanGameBoard();
      renderGameBoard();
      gameController.restart();
      header.removeChild(button);
    });

    header.appendChild(button);
  }

  function renderGame() {
    choose.style.display = "none";
    game.style.display = "block";
  }

  function renderGameBoard()  {
    const board = gameBoard.getGameBoard();
    grid.forEach((position, index) => position.textContent = board[index]);
  }

  return {
    getGrid,
    renderGameBoard,
    displayPlayer,
    displayWinner
  }
})();

const gameController = (function() {
  const grid = displayController.getGrid();
  const start = document.querySelector('#choose-div button');

  let gameOver = false;
  const players = [];
  let actualPlayer = 0;

  start.addEventListener('click', () => {
    const playersInput = document.querySelectorAll("#players div input");

    playersInput.forEach((input, index) => {
      if (!index) players.push(player(input.value, 'X'));
      else players.push(player(input.value, 'O'));
    });

    displayController.displayPlayer(players[actualPlayer]);
  });

  grid.forEach((position, index) => {
    position.addEventListener('click', move.bind(position, index));
  });

  function restart() {
    actualPlayer = 0;
    gameOver = false;
  }

  function move(index) {
    if (!this.textContent && !gameOver) {
      gameBoard.setGameBoard(index, players[actualPlayer].getMark());
      displayController.renderGameBoard();
      checkWinner(players[actualPlayer]);
      if (!gameOver) {
        changePlayer();
        displayController.displayPlayer(players[actualPlayer]);
      }
    }    
  }

  function changePlayer() {
    if (!actualPlayer) actualPlayer = 1;
    else actualPlayer = 0;
  }

  function checkWinner(player) {
    const board = gameBoard.getGameBoard();

    if ((board[0] === board[1] && board[1] === board[2] && board[0]) ||
        (board[3] === board[4] && board[4] === board[5] && board[3]) ||
        (board[6] === board[7] && board[7] === board[8] && board[6]) ||
        (board[0] === board[3] && board[3] === board[6] && board[0]) ||
        (board[1] === board[4] && board[4] === board[7] && board[1]) ||
        (board[2] === board[5] && board[5] === board[8] && board[2]) ||
        (board[0] === board[4] && board[4] === board[8] && board[0]) ||
        (board[2] === board[4] && board[4] === board[6]) && board[2]) {
          gameOver = true;
          displayController.displayWinner(player);
        } else if (board.every(place => place)) {
          gameOver = true;
          displayController.displayWinner('TIE');
        }
  }

  return { restart };

})();

const gameBoard = (function () {
  let gameboard = ['', '', '', '', '', '', '', '', ''];

  const getGameBoard = () => gameboard;
  const setGameBoard = (position, marker) => gameboard[position] = marker;
  const cleanGameBoard = () => gameboard = ['', '', '', '', '', '', '', '', ''];

  return {
    getGameBoard,
    setGameBoard,
    cleanGameBoard
  };
})();

function player(name, mark) {
  const getName = () => name;
  const setName = (newName) => name = newName;
  const getMark = () => mark;
  const setMark = (newMark) => mark = newMark;

  return {
    getName,
    setName,
    getMark,
    setMark
  };
}
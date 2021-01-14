const gameBoard = (function () {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  const getGameBoard = () => gameboard;
  const setGameBoard = (position, marker) => gameboard[position] = marker;

  return {
    getGameBoard,
    setGameBoard
  };
})();

const displayController = (function(gb) {
  const grid = document.querySelectorAll('#gameboard button');
  const turn = document.querySelector('#main-header h2');

  const getGrid = () => grid;

  const renderGameBoard = () => {
    const board = gb.getGameBoard();
    grid.forEach((position, index) => position.textContent = board[index]);
  }

  const displayPlayer = (player) => {
    turn.textContent = `${player.getName()}'s turn`;
  }

  return { 
    renderGameBoard,
    displayPlayer, 
    getGrid
  };

})(gameBoard);

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

const gameController = (function(gb, dc) {
  const grid = dc.getGrid();
  let gameOver = false;
  
  const player1 = player('Player1', 'X');
  const player2 = player('Player2', 'O');
  let actualPlayer;
  changePlayer();
  dc.displayPlayer(actualPlayer);

  grid.forEach((position, index) => {
    position.addEventListener('click', move.bind(position, index));
  });

  function move(index) {
    if (!this.textContent && !gameOver) {
      gb.setGameBoard(index, actualPlayer.getMark());
      checkWinner(actualPlayer);
      changePlayer();
      dc.displayPlayer(actualPlayer);
      dc.renderGameBoard();
    }    
  }

  function changePlayer() {
    if (!actualPlayer) {
      actualPlayer = player1;
    } else if (actualPlayer.getName() === player1.getName()) {
      actualPlayer = player2;
    } else {
      actualPlayer = player1;
    }
  }

  function checkWinner(player) {
    const board = gb.getGameBoard();

    if ((board[0] === board[1] && board[1] === board[2] && board[0]) ||
        (board[3] === board[4] && board[4] === board[5] && board[3]) ||
        (board[6] === board[7] && board[7] === board[8] && board[6]) ||
        (board[0] === board[3] && board[3] === board[6] && board[0]) ||
        (board[1] === board[4] && board[4] === board[7] && board[1]) ||
        (board[2] === board[5] && board[5] === board[8] && board[2]) ||
        (board[0] === board[4] && board[4] === board[8] && board[0]) ||
        (board[2] === board[4] && board[4] === board[6]) && board[2]) {
          gameOver = true;
          console.log('Winner ' + player.getName());
        } else if (board.every(place => place)) {
          console.log('TIE');
        }
  }

})(gameBoard, displayController);
const gameBoard = (function () {
  const gameboard = ['', '', '', '', '', '', '', '', ''];

  const getGameBoard = () => gameboard;
  const setGameBoard = (position, marker) => gameboard[position] = marker;

  return {
    getGameBoard,
    setGameBoard
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

const displayController = (function(gameboard) {
  const grid = document.querySelectorAll('#gameboard button');
  const turn = document.querySelector('#main-header h2');

  const player1 = player('Player1', 'X');
  const player2 = player('Player2', 'O');
  let actualPlayer;
  changePlayer();

  grid.forEach((position, index) => {
    position.addEventListener('click', () => {
      if (!position.textContent) {
        gameboard.setGameBoard(index, actualPlayer.getMark());
        changePlayer();
        renderGameBoard();
      }       
    });
  });

  function changePlayer() {
    if (!actualPlayer) {
      actualPlayer = player1;
    } else if (actualPlayer.getName() === player1.getName()) {
      actualPlayer = player2;
    } else {
      actualPlayer = player1;
    }
    turn.textContent = `${actualPlayer.getName()}'s turn`;
  }

  const renderGameBoard = () => {
    const board = gameboard.getGameBoard();
    grid.forEach((position, index) => position.textContent = board[index]);
  }

  return { renderGameBoard };
})(gameBoard);
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

  const renderGameBoard = () => {
    const board = gb.getGameBoard();
    grid.forEach((position, index) => position.textContent = board[index]);
  }

  const displayPlayer = (player) => {
    turn.textContent = `${player.getName()}'s turn`;
  }

  return { renderGameBoard, displayPlayer, grid };
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
  const grid = dc.grid;
  
  const player1 = player('Player1', 'X');
  const player2 = player('Player2', 'O');
  let actualPlayer;
  changePlayer();
  dc.displayPlayer(actualPlayer);

  grid.forEach((position, index) => {
    position.addEventListener('click', mark.bind(position, index));
  });

  function mark(index) {
    if (!this.textContent) {
      gb.setGameBoard(index, actualPlayer.getMark());
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
    return actualPlayer;
  }

})(gameBoard, displayController);
const gameBoard = (function () {
  const gameboard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X'];

  const getGameBoard = () => gameboard;
  const setGameBoard = (position, marker) => gameboard[position] = marker;

  return {
    getGameBoard,
    setGameBoard
  };
})();

const displayController = (function(gameboard) {
  const renderGameBoard = () => {
    const positions = document.querySelectorAll('#gameboard button');
    const board = gameboard.getGameBoard();
    positions.forEach((position, index) => position.textContent = board[index]);
  }

  return { renderGameBoard };
})(gameBoard);

function player(name, marker) {

}

displayController.renderGameBoard();
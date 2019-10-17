const player = () => {

  const humanAttack = (board, row, col) => {
    return board.receiveAttack([row, col]);
  }

  const aiAttack = (gameBoard) => {
    let row;
    let col;

    while (gameBoard.board[row][col] == 'X' || gameBoard.board[row][col] == 'M') {
      row = randomNumber();
      col = randomNumber();
    }
    gameBoard.receiveAttack([row, col]);
  }

  const randomNumber = () => {
    return Math.round((Math.random() * 9));
  }

}
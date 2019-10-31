import gameBoard from '../modules/factories/gameBoard';
import ship from '../modules/factories/ship';

describe('theBoard', () => {
  let ships;
  let theBoard;
  beforeEach(() => {
    ships = [ship(2), ship(1)];
    theBoard = gameBoard(ships);
  });
  it('place ship properly', () => {
    theBoard.placeShip(theBoard.ships[0], 5, 2, 'horizontal');
    expect(theBoard.board[5][2]).toBe(1);
    expect(theBoard.board[5][3]).toBe(1);
  });

  it('can place ship vertically', () => {
    theBoard.placeShip(theBoard.ships[0], 5, 2, 'vertical');
    expect(theBoard.board[5][2]).toBe(1);
    expect(theBoard.board[6][2]).toBe(1);
  });

  it('doesnt place the ship if loc is not good', () => {
    theBoard.placeShip(theBoard.ships[0], 9, 9, 'horizontal');
    expect(theBoard.board[9][9]).toBe(0);
  });

  it('perfectly sends the location to ship', () => {
    theBoard.placeShip(theBoard.ships[0], 5, 2, 'horizontal');
    expect(theBoard.ships[0].loc).toEqual(expect.arrayContaining([[5, 2]]));
    expect(theBoard.ships[0].loc).toEqual(expect.arrayContaining([[5, 3]]));
  });

  describe('Recieving an Attack', () => {
    it('place an M if there is no ship', () => {
      theBoard.placeShip(theBoard.ships[0], 5, 2, 'horizontal');
      theBoard.recieveAttack([4, 3]);
      expect(theBoard.board[5][2]).toBe(1);
      expect(theBoard.board[5][3]).toBe(1);
      expect(theBoard.board[4][3]).toBe('M');
    });

    it('place an X if there is a ship', () => {
      theBoard.placeShip(theBoard.ships[0], 5, 2, 'horizontal');
      theBoard.recieveAttack([5, 3]);
      expect(theBoard.board[5][2]).toBe(1);
      expect(theBoard.board[5][3]).toBe('X');
      expect(theBoard.ships[0].hitShow()).toBe(1);
    });

    it('knows when all ships are Sunk', () => {
      theBoard.placeShip(theBoard.ships[0], 5, 2, 'horizontal');
      theBoard.placeShip(theBoard.ships[1], 3, 2, 'horizontal');
      theBoard.recieveAttack([5, 2]);
      theBoard.recieveAttack([5, 3]);
      theBoard.recieveAttack([3, 2]);
      expect(theBoard.board[5][2]).toBe('X');
      expect(theBoard.board[5][3]).toBe('X');
      expect(theBoard.board[3][2]).toBe('X');
      expect(theBoard.isAllSunk()).toBeTruthy();
    });
  });
});

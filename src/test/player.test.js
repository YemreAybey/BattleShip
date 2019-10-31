import ship from '../modules/factories/ship';
import gameBoard from '../modules/factories/gameBoard';
import player from '../modules/factories/player';
describe('Logic', () => {
  let shipy;
  let bor;
  let pl1;
  beforeEach(() => {
    shipy = [ship(2)];
    bor = gameBoard(shipy);
    pl1 = player();
  });
  describe('hit', () => {
    it('attacks perfectly', () => {
      bor.placeShip(bor.ships[0], 0, 0, 'vertical');
      pl1.pAttack(bor, 0, 0);
      expect(bor.board[0][0]).toBe('X');
    });
    it('can do ai attacks perfectly', () => {
      bor.placeShip(bor.ships[0], 0, 0, 'vertical');
      pl1.aiAttack(bor);
      let sum = 0;
      bor.board.forEach(arr =>
        arr.forEach(n => {
          if (n == 0 || n == 1) {
            sum += 1;
          }
        })
      );
      expect(sum).toBe(99);
    });
  });
});

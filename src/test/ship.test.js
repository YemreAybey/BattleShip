import ship from '../modules/factories/ship';

describe('Ship', () => {
  let shipy;
  beforeEach(() => {
    shipy = ship(2);
  });
  describe('hit', () => {
    it('increments the hits if not sunk', () => {
      shipy.hit();
      expect(shipy.hitShow()).toBe(1);
    });
    it('hit should not increament hits if ship is already sunk', () => {
      shipy.hit();
      shipy.hit();
      shipy.hit();
      expect(shipy.hitShow()).toBe(2);
    });
  });
  it('isSunk returns false if every part is not hit', () => {
    shipy.hit();
    expect(shipy.isSunk()).toBeFalsy();
  });

  it('isSunk returns true if every part hit', () => {
    shipy.hit();
    shipy.hit();
    expect(shipy.isSunk()).toBeTruthy();
  });
});

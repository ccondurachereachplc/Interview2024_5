import ITEM_MANES from '../constants';

describe('Constants', () => {
  it('should match the Item Names.', () => {
    const expected = {
      AGE_BRIE: 'Aged Brie',
      BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
      SULFURAS: 'Sulfuras, Hand of Ragnaros',
      DEFAULT: 'foo',
    };

    expect(expected).toEqual(ITEM_MANES);
  });
});

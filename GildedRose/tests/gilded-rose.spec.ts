import { Item, GildedRose } from '../gilded-rose';
import ITEM_MANES from '../constants';
import SPECIFICATIONS from '../config';

const { AGE_BRIE, BACKSTAGE, SULFURAS, DEFAULT } = ITEM_MANES;

describe('<Gilded Rose>', () => {
  const cases = [
    { case: { name: AGE_BRIE, sellIn: 0, quality: 0 }, expected: { name: AGE_BRIE, sellIn: -1, quality: SPECIFICATIONS[AGE_BRIE].QUALITY.MIN } },
    { case: { name: AGE_BRIE, sellIn: 0, quality: -1 }, expected: { name: AGE_BRIE, sellIn: -1, quality: SPECIFICATIONS[AGE_BRIE].QUALITY.MIN } },
    { case: { name: AGE_BRIE, sellIn: 10, quality: 10 }, expected: { name: AGE_BRIE, sellIn: 9, quality: 11 } },
    { case: { name: AGE_BRIE, sellIn: 50, quality: 50 }, expected: { name: AGE_BRIE, sellIn: 49, quality: SPECIFICATIONS[AGE_BRIE].QUALITY.MAX } },
    { case: { name: AGE_BRIE, sellIn: 90, quality: 83 }, expected: { name: AGE_BRIE, sellIn: 89, quality: SPECIFICATIONS[AGE_BRIE].QUALITY.MAX } },
    { case: { name: BACKSTAGE, sellIn: 0, quality: 0 }, expected: { name: BACKSTAGE, sellIn: -1, quality: SPECIFICATIONS[BACKSTAGE].QUALITY.MIN } },
    { case: { name: BACKSTAGE, sellIn: 5, quality: 5 }, expected: { name: BACKSTAGE, sellIn: 4, quality: 8 } },
    { case: { name: BACKSTAGE, sellIn: 6, quality: 5 }, expected: { name: BACKSTAGE, sellIn: 5, quality: 7 } },
    { case: { name: BACKSTAGE, sellIn: 10, quality: 10 }, expected: { name: BACKSTAGE, sellIn: 9, quality: 12 } },
    { case: { name: BACKSTAGE, sellIn: 11, quality: 10 }, expected: { name: BACKSTAGE, sellIn: 10, quality: 11 } },
    { case: { name: BACKSTAGE, sellIn: 40, quality: 35 }, expected: { name: BACKSTAGE, sellIn: 39, quality: 36 } },
    { case: { name: BACKSTAGE, sellIn: 55, quality: 57 }, expected: { name: BACKSTAGE, sellIn: 54, quality: SPECIFICATIONS[BACKSTAGE].QUALITY.MAX } },
    { case: { name: BACKSTAGE, sellIn: 90, quality: 83 }, expected: { name: BACKSTAGE, sellIn: 89, quality: SPECIFICATIONS[BACKSTAGE].QUALITY.MAX } },
    { case: { name: SULFURAS, sellIn: 0, quality: 0 }, expected: { name: SULFURAS, sellIn: 0, quality: 0 } },
    { case: { name: SULFURAS, sellIn: 0, quality: -1 }, expected: { name: SULFURAS, sellIn: 0, quality: 0 } },
    { case: { name: SULFURAS, sellIn: 10, quality: 10 }, expected: { name: SULFURAS, sellIn: 10, quality: 10 } },
    { case: { name: SULFURAS, sellIn: 50, quality: 40 }, expected: { name: SULFURAS, sellIn: 50, quality: 40 } },
    { case: { name: SULFURAS, sellIn: 90, quality: 83 }, expected: { name: SULFURAS, sellIn: 90, quality: SPECIFICATIONS[SULFURAS].QUALITY.MAX } },
    { case: { name: DEFAULT, sellIn: -1, quality: 10 }, expected: { name: DEFAULT, sellIn: -2, quality: 8 } },
    { case: { name: DEFAULT, sellIn: 0, quality: 0 }, expected: { name: DEFAULT, sellIn: -1, quality: SPECIFICATIONS[DEFAULT].QUALITY.MIN } },
    { case: { name: DEFAULT, sellIn: 0, quality: -1 }, expected: { name: DEFAULT, sellIn: -1, quality: SPECIFICATIONS[DEFAULT].QUALITY.MIN } },
    { case: { name: DEFAULT, sellIn: 10, quality: 10 }, expected: { name: DEFAULT, sellIn: 9, quality: 9 } },
    { case: { name: DEFAULT, sellIn: 50, quality: 50 }, expected: { name: DEFAULT, sellIn: 49, quality: 49 } },
    { case: { name: DEFAULT, sellIn: 90, quality: 83 }, expected: { name: DEFAULT, sellIn: 89, quality: SPECIFICATIONS[DEFAULT].QUALITY.MAX } },
  ];

  cases.map(({ case: { name, sellIn, quality }, expected }) => {
    it(`<${name}> updated correctly when quality = ${quality} and sellIn = ${sellIn}`, () => {
      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe(expected.name);
      expect(items[0].sellIn).toBe(expected.sellIn);
      expect(items[0].quality).toBe(expected.quality);
    });
  });

  it('Items should be empty', () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();

    expect(items).toEqual([]);
  });
});

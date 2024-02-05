import ITEM_MANES from '../constants';
import SPECIFICATIONS from '../config';

const { AGE_BRIE, BACKSTAGE, SULFURAS, DEFAULT } = ITEM_MANES;

describe('Config', () => {
  it('should match the Item Names.', () => {
    const expected = {
      [AGE_BRIE]: {
        QUALITY: {
          MIN: 0,
          MAX: 50,
          TYPE: 'INCREASED',
        },
      },
      [BACKSTAGE]: {
        QUALITY: {
          MIN: 0,
          MAX: 50,
          TYPE: 'INCREASED',
          FACTOR: [
            {
              SELL_IN_START_DAY: 1,
              SELL_IN_END_DAY: 5,
              VALUE: 3,
            },
            {
              SELL_IN_START_DAY: 6,
              SELL_IN_END_DAY: 10,
              VALUE: 2,
            },
          ],
        },
      },
      [SULFURAS]: {
        QUALITY: {
          MIN: 0,
          MAX: 80,
          TYPE: 'NOT-AFFECTED',
        },
      },
      [DEFAULT]: {
        QUALITY: {
          MIN: 0,
          MAX: 50,
          TYPE: 'DECREASED',
        },
      },
    };

    expect(expected).toEqual(SPECIFICATIONS);
  });
});

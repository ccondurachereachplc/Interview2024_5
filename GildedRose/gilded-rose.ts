import ITEM_MANES from './constants';
import SPECIFICATIONS from './config';
const { AGE_BRIE, BACKSTAGE, SULFURAS } = ITEM_MANES;

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  _calculateValueByQualityType(type: string, value: number, factor: number) {
    switch (type) {
      case 'INCREASED':
        return value + factor;
      case 'NOT-AFFECTED':
        return value;
      default:
        return value - factor;
    }
  }

  _calculateSellInFactorByItem(itemName: string, days: number) {
    const { FACTOR = [] } = SPECIFICATIONS[itemName].QUALITY;

    for (let i = 0; i < FACTOR.length; i++) {
      const { SELL_IN_START_DAY, SELL_IN_END_DAY, VALUE } = FACTOR[i];
      if (SELL_IN_START_DAY <= days && days <= SELL_IN_END_DAY) {
        return VALUE;
      }
    }

    if (days <= 0) return 2;

    return 1;
  }

  _calculateQuality(itemName: string, currentQuality: number, currentSellIn: number) {
    const { MIN, MAX, TYPE } = SPECIFICATIONS[itemName].QUALITY;

    if (currentQuality > MIN && currentQuality <= MAX) {
      const factor = this._calculateSellInFactorByItem(itemName, currentSellIn);
      const calculatedQuality = this._calculateValueByQualityType(TYPE, currentQuality, factor);
      return MAX > calculatedQuality ? calculatedQuality : MAX;
    } else if (currentQuality > MAX) {
      return MAX;
    } else {
      return MIN;
    }
  }

  _calculateSellInDays(days: number) {
    return days - 1;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const itemName = this.items[i].name;
      const { MIN } = SPECIFICATIONS[itemName].QUALITY;

      const currentQuality = this.items[i].quality;
      const currentSellIn = this.items[i].sellIn;

      switch (itemName) {
        case AGE_BRIE:
        case BACKSTAGE:
          this.items[i].quality = currentSellIn <= MIN ? MIN : this._calculateQuality(itemName, currentQuality, currentSellIn);
          this.items[i].sellIn = this._calculateSellInDays(currentSellIn);
          break;
        case SULFURAS:
          this.items[i].quality = this._calculateQuality(itemName, currentQuality, currentSellIn);
          this.items[i].sellIn = currentSellIn;
          break;
        default:
          this.items[i].quality = this._calculateQuality('foo', currentQuality, currentSellIn);
          this.items[i].sellIn = this._calculateSellInDays(currentSellIn);
      }
    }

    return this.items;
  }
}

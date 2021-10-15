export interface FruitType {
  sku: Sku;
  name: string;
  price: number;
}

export const FruitDb = {
  Pear: {
    sku: "Pear",
    name: "Pear",
    price: 10,
  },
  Banana: {
    sku: "Banana",
    name: "Banana",
    price: 15,
  },
  Apple: {
    sku: "Apple",
    name: "Apple",
    price: 20,
  },
};

type Sku = string;
type CartType = Map<Sku, number>;

type Weekday = number;
export enum DayOfWeek {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export interface CurrentWeekdayProvider {
  getCurrentWeekday: () => DayOfWeek;
}

export class DateWeekdayProvider implements CurrentWeekdayProvider {
  currentDate: Date;

  getCurrentWeekday(): DayOfWeek {
    return this.currentDate.getDay();
  }

  constructor() {
    this.currentDate = new Date();
  }
}

export interface PromoSpecification {
  calculateDiscount: (cart: CartType) => number;
}

// Item	Price	Bulk Price	When it applies
// Pear	10	2 for 18	Everyday
// Apple	20	3 for 50	Monday
// Apple	20	30 for 450	Friday
// Banana	15	no bulk price	-

export class PearPromotion implements PromoSpecification {
  calculateDiscount(cart: CartType): number {
    let pearCount = 0;

    for (const [key, value] of cart) {
      if (key === "Pear") {
        pearCount += value;
      }
    }

    return 2 * Math.floor(pearCount / 2);
  }
}

export class ApplePromotionMonday implements PromoSpecification {
  number = DayOfWeek.Monday;
  numberProvider: CurrentWeekdayProvider;

  calculateDiscount(cart: CartType): number {
    if (this.numberProvider.getCurrentWeekday() != this.number) {
      return 0;
    }

    let appleCount = 0;

    for (const [key, value] of cart) {
      if (key === "Apple") {
        appleCount += value;
      }
    }

    return 10 * Math.floor(appleCount / 3);
  }

  constructor(weekdayProvider: CurrentWeekdayProvider) {
    this.numberProvider = weekdayProvider;
  }
}

export class ApplePromotionFriday implements PromoSpecification {
  number = DayOfWeek.Friday;
  numberProvider: CurrentWeekdayProvider;

  calculateDiscount(cart: CartType): number {
    if (this.numberProvider.getCurrentWeekday() != this.number) {
      return 0;
    }

    let appleCount = 0;

    for (const [key, value] of cart) {
      if (key === "Apple") {
        appleCount += value;
      }
    }

    return 150 * Math.floor(appleCount / 30);
  }

  constructor(numberProvider: CurrentWeekdayProvider) {
    this.numberProvider = numberProvider;
  }
}

class Cart {
  items: CartType;
  weekdayProvider: CurrentWeekdayProvider;
  discounts: Array<PromoSpecification>;

  constructor(items: CartType = new Map(), weekdayProvider: CurrentWeekdayProvider = new DateWeekdayProvider()) {
    this.items = items;
    this.weekdayProvider = weekdayProvider;
    this.discounts = [
      new PearPromotion(),
      new ApplePromotionMonday(this.weekdayProvider),
      new ApplePromotionFriday(this.weekdayProvider),
    ];
  }

  getCart(): CartType {
    return this.items;
  }

  add(product: FruitType, quantity: number) {
    if (this.items.get(product.sku)) {
      this.items.set(product.sku, this.items.get(product.sku) + quantity);
    } else {
      this.items.set(product.sku, quantity);
    }
  }

  calculateTotal(): number {
    let subTotal = 0;
    let discountTotal = 0;

    // Map to Array [[key, value], [key, value]]
    Array.from(this.items.entries()).forEach(([key, value]) => {
      subTotal = FruitDb[key].price * value + subTotal;
    });

    Array.from(this.discounts.entries()).forEach(([key, value]) => {
      discountTotal += value.calculateDiscount(this.items);
    });

    return subTotal - discountTotal;
  }
}

export default Cart;

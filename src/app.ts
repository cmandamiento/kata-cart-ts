type Sku = string;

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
  Orange: {
    sku: "Orange",
    name: "Orange",
    price: 10,
  },
};

type CartType = Map<Sku, number>;

export interface PromoSpecification {
  calculateDiscount: (cart: CartType) => number;
}

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

export class ApplePromotion implements PromoSpecification {
  calculateDiscount(cart: CartType): number {
    let appleCount = 0;

    for (const [key, value] of cart) {
      if (key === "Apple") {
        appleCount += value;
      }
    }

    return 10 * Math.floor(appleCount / 3);
  }
}

// Pears => 40
// Apple => 15
// Pear promo => -4
// Pear & Apple promo => -10

const promoSpecfication = (cart: CartType) => { };

class Cart {
  items: CartType;
  discounts: Array<PromoSpecification> = [
    new PearPromotion(),
    new ApplePromotion(),
  ];

  constructor(items: CartType = new Map()) {
    this.items = items;
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
    let total = 0;
    let discountTotal = 0;

    // Map to Array [[key, value], [key, value]]
    Array.from(this.items.entries()).forEach(([key, value]) => {
      total = FruitDb[key].price * value + total;
    });

    Array.from(this.discounts.entries()).forEach(([key, value]) => {
      discountTotal += value.calculateDiscount(this.items);
    });

    return total - discountTotal;
  }
}

export default Cart;

export interface FruitType {
  sku: string;
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
    price: 15,
  },
  Orange: {
    sku: "Orange",
    name: "Orange",
    price: 10,
  },
};

type CartType = Map<string, number>;

export interface PromoSpecification {
  isSatisfiedBy: (cart: CartType) => void;
}

// Pears => 40
// Apple => 15
// Pear promo => -4
// Pear & Apple promo => -10

// const promoSpecfication = (cart: CartType) => {};

class Cart {
  items: CartType;

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

    // Map to Array [[key, value], [key, value]]
    Array.from(this.items.entries()).forEach(([key, value]) => {
      total = FruitDb[key].price * value + total;
    });

    return total;
  }
}

export default Cart;

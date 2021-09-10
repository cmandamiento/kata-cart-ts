export interface FruitType {
  sku: string;
  name: string;
  price: number;
}

export interface CartItemType {
  sku: string;
  quantity: number;
  price?: number;
}

export const FruitDb = {
  pear: {
    sku: "0001",
    name: "Pear",
    price: 10,
  },
  banana: {
    sku: "0002",
    name: "Banana",
    price: 15,
  },
};

class Cart {
  products: FruitType[];

  constructor(products?: FruitType[]) {
    this.products = products || [];
  }

  getCart() {
    return this.products;
  }

  add(product: FruitType, quantity: number) {
    // const = constante y let = variable

    if (quantity > 1) {
      Array(quantity).forEach((item) => this.products.push(product));
    } else {
      this.products.push(product);
    }
  }

  calculateTotal(): number {
    const cart = []; // {qty: 2 name: 'Pear'}

    // TODO: Agrupar las frutas
    // TODO: Agrupar usando Map / Set
    this.products.forEach((fruit) => {
      // const elm = this.find((fruit) => fruit.sku === current.sku);
    });

    // TODO: Calculo por bulk price

    return 0;
  }
}

export default Cart;

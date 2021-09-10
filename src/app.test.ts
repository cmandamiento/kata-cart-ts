import Cart, { CartItemType, FruitType } from "./app";

describe("Cart test", () => {
  it("Cart allows add item", () => {
    const Fruit: FruitType = {
      sku: "1100",
      name: "Orange",
      price: 10,
    };

    const quantity = 1;
    const newCart = new Cart();

    expect(newCart.getCart()).toHaveLength(0);

    newCart.add(Fruit, quantity);

    expect(newCart.getCart()).toHaveLength(1);
    expect(newCart.getCart()[0].sku).toBe(Fruit.sku);
  });

  it("Cart calculates total", () => {
    const Fruits: FruitType[] = [
      {
        sku: "1111",
        name: "Pear",
        price: 10,
      },
      {
        sku: "2222",
        name: "Apple",
        price: 15,
      },
    ];

    const newCart = new Cart(Fruits);
    expect(newCart.calculateTotal()).toBe(25);
  });

  it("Cart calculates bulk prices", () => {
    const Pear: FruitType = {
      sku: "xxx",
      name: "Pear",
      price: 10,
    };

    const newCart = new Cart();
    newCart.add(Pear, 2);

    expect(newCart.calculateTotal()).toBe(18);
  });
});

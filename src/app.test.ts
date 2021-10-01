import Cart, { FruitDb, FruitType } from "./app";

describe("Cart test", () => {
  it("Cart allows add item", () => {
    const Fruit: FruitType = {
      sku: "Orange",
      name: "Orange",
      price: 10,
    };

    const quantity = 1;
    const newCart = new Cart();

    expect(newCart.getCart().size).toBe(0);

    newCart.add(Fruit, quantity);

    expect(newCart.getCart().size).toBe(1);
    expect(newCart.getCart().get(Fruit.sku)).toBe(quantity);
  });

  it("Cart calculates total", () => {
    const items = new Map();
    items.set("Pear", 1);
    items.set("Apple", 1);

    const newCart = new Cart(items);
    expect(newCart.calculateTotal()).toBe(25);
  });

  it("Cart calculates bulk prices", () => {
    const Pear = FruitDb.Pear;

    const newCart = new Cart();
    newCart.add(Pear, 2);

    expect(newCart.calculateTotal()).toBe(18);
  });
});

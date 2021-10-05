import Cart, { FruitDb, FruitType, PearPromotion, ApplePromotion } from "./app";

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
    expect(newCart.calculateTotal()).toBe(30);
  });

  it("Pear promotion works, exact", () => {
    const items = new Map();
    items.set("Pear", 2);

    const newCart = new Cart(items);
    const newPearPromo = new PearPromotion();
    expect(newPearPromo.calculateDiscount(newCart.items)).toBe(2);
  });

  it("Pear promotion works, exceeding", () => {
    const items = new Map();
    items.set("Pear", 3);

    const newCart = new Cart(items);
    const newPearPromo = new PearPromotion();
    expect(newPearPromo.calculateDiscount(newCart.items)).toBe(2);
  });

  it("Apple promotion works, exact", () => {
    const items = new Map();
    items.set("Apple", 3);

    const newCart = new Cart(items);
    const newApplePromo = new ApplePromotion();
    expect(newApplePromo.calculateDiscount(newCart.items)).toBe(10);
  });

  it("Apple promotion works, exceeding", () => {
    const items = new Map();
    items.set("Apple", 5);

    const newCart = new Cart(items);
    const newApplePromo = new ApplePromotion();
    expect(newApplePromo.calculateDiscount(newCart.items)).toBe(10);
  });


  it("Cart calculates bulk prices on single fruit add", () => {
    const Pear = FruitDb.Pear;
    const Apple = FruitDb.Apple;
  
    const newCart = new Cart();
    newCart.add(Pear, 2);
    newCart.add(Apple, 3);

    expect(newCart.calculateTotal()).toBe(68);
  });

  it("Cart calculates bulk priceson multiple fruit add", () => {
    const Pear = FruitDb.Pear;
    const Apple = FruitDb.Apple;
  
    const newCart = new Cart();
    newCart.add(Pear, 1);
    newCart.add(Apple, 1);
    newCart.add(Pear, 1);
    newCart.add(Apple, 1);
    newCart.add(Apple, 1);
    
    expect(newCart.calculateTotal()).toBe(68);
  });

  it("Cart calculates bulk prices with bulk excess", () => {
    const Pear = FruitDb.Pear;
 
    const newCart = new Cart();
    newCart.add(Pear, 3);

    expect(newCart.calculateTotal()).toBe(28);
  });

  it("Cart calculates bulk prices with 10 bananas", () => {
    const Banana = FruitDb.Banana;

    const newCart = new Cart();
    newCart.add(Banana, 10);

    expect(newCart.calculateTotal()).toBe(150);
  });
});

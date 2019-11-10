const Unit = require("../unit");

describe("UnitModel", () => {
  test("should throw if unit health is less than 0", () => {
    expect(() => new Unit(-1, 1000)).toThrow();
  });
  test("should throw if unit health is more than 100", () => {
    expect(() => new Unit(105, 1000)).toThrow();
  });

  test("should throw if recharge is less than 100", () => {
    expect(() => new Unit(50, 80)).toThrow();
  });

  test("should throw if recharge is more than 2000", () => {
    expect(() => new Unit(105, 2500)).toThrow();
  });

  test("should return true if health is more than 0", () => {
    const u = new Unit(20, 1000);
    expect(u.isActive()).toBe(true);
  });
});

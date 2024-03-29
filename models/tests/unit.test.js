const Unit = require("../unit");

jest.useFakeTimers();

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

  test("receiveDamage should health by 20", () => {
    const u = new Unit(50, 1000);
    u.receiveDamage(20);
    expect(u.health).toBe(30);
  });

  test("can recharge", () => {
    const u = new Unit(50, 1000);
    expect(u.isReady).toBe(true);

    u.rechargeForNextAttack();
    expect(u.isReady).toBe(false);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(u.isReady).toBe(true);
  });

  test("receiveDamage sets health 0 if unit just got killed/destroyed and only decreases health if not", () => {
    const u1 = new Unit(0.5, 1000);
    u1.receiveDamage(5);
    expect(u1.health).toBe(0);

    const u2 = new Unit(0, 1000);
    u2.receiveDamage(5);
    expect(u1.health).toBe(0);
  });
});

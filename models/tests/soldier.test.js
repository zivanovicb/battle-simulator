const Soldier = require("../soldier");
const sinon = require("sinon");

describe("SoldierModel", () => {
  test("should throw if experience is less than 0", () => {
    expect(() => new Soldier(30, 1200, -1)).toThrow();
  });

  test("should throw if experience is more than 50", () => {
    expect(() => new Soldier(30, 1200, 51)).toThrow();
  });

  test("should NOT throw if experience is a number between 0 and 50", () => {
    expect(() => new Soldier(30, 1200, 45)).not.toThrow();
  });

  test("should be able to instanciate", () => {
    const s1 = new Soldier(100, 1100, 30);
    expect(s1.health).toBe(100);
    expect(s1.recharge).toBe(1100);
    expect(s1.experience).toBe(30);
  });

  test("isActive should return false if health is 0", () => {
    const s = new Soldier(0, 1200, 45);
    expect(s.isActive()).toBe(false);
  });

  test("isActive should return true if health is more than 0", () => {
    const s = new Soldier(1, 1200, 45);
    expect(s.isActive()).toBe(true);
  });

  test("getDamage computes right amount of damage a soldier can afflict", () => {
    const s = new Soldier(5, 1200, 30);
    expect(s.getDamage()).toBe(0.05 + s.experience / 100);
  });

  test("getAttackSuccessProbability computes attackSuccessProbability", () => {
    const s = new Soldier(5, 1200, 30);

    // Stub out Math.random so it always returns '4'
    sinon.stub(Math, "random").returns(4);

    expect(s.getAttackSuccessProbability()).toBe(
      (0.5 * (1 + s.health / 100) * Math.random(30 + s.experience, 100)) / 100
    );
  });
});

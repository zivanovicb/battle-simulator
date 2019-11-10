const sinon = require("sinon");
const Vehicle = require("../vehicle");
const Soldier = require("../soldier");
const gavg = require("../../helpers/gavg");

describe("VehicleModel", () => {
  test("throws if recharge is equal or less than 1000(ms)", () => {
    expect(() => new Vehicle(30, 800, new Soldier(100, 900, 30))).toThrow();
    expect(() => new Vehicle(30, 800, new Soldier(100, 1000, 30))).toThrow();
  });

  test("can be instanciated", () => {
    const s1 = new Soldier(30, 1100, 30);
    const v = new Vehicle(100, 1200, [s1]);

    expect(v.health).toBe(100);
    expect(v.totalHealth).toBe(v.getTotalHealth());
    expect(v.operators.length).toBe(1);
  });

  test("getTotalHealth computes right amount of total health for a vehicle(average of vehicle health + all operators health)", () => {
    const s1 = new Soldier(30, 1100, 30);
    const s2 = new Soldier(50, 1100, 30);
    const s3 = new Soldier(40, 1100, 30);

    const v = new Vehicle(100, 1200, [s1, s2, s3]);

    // 30 + 50 + 40 + 100 / 4
    expect(v.getTotalHealth()).toBe(220 / 4);
  });

  test("getTotalHealth returns false if vehicle's total health is 0 or less", () => {
    const s1 = new Soldier(30, 1100, 30);
    const s2 = new Soldier(50, 1100, 30);
    const s3 = new Soldier(40, 1100, 30);

    const v = new Vehicle(100, 1200, [s1, s2, s3]);

    // 30 + 50 + 40 + 100 / 4
    expect(v.getTotalHealth()).toBe(220 / 4);
  });

  test("getDamage computers right amount of damage a vehicle could possibly deal", () => {
    const e1 = 30;
    const e2 = 50;
    const e3 = 40;

    const s1 = new Soldier(30, 1100, e1);
    const s2 = new Soldier(50, 1100, e2);
    const s3 = new Soldier(40, 1100, e3);

    const v = new Vehicle(100, 1200, [s1, s2, s3]);

    // 0.1 + sum(operators.experience / 100)
    expect(v.getDamage()).toBe(1.3000000000000003);
  });

  test("getAttackSuccessProbability computers right amount of attack success probability", () => {
    const s1 = new Soldier(60, 1100, 45);
    const s2 = new Soldier(30, 1100, 20);

    const v1 = new Vehicle(50, 1250, [s1, s2]);

    sinon.stub(Math, "random").returns(4);

    // 0.5 * (1 + this.health / 100) * gavg(operatorsSuccessRates);
    expect(v1.getAttackSuccessProbability()).toBe(0.021633307652783935);
  });

  test("isActive returns true if there is a vehicle operator with health > 0 && vehicle itself has > 0 health", () => {
    const s1 = new Soldier(60, 1100, 45);
    const s2 = new Soldier(30, 1100, 20);

    const v1 = new Vehicle(50, 1250, [s1, s2]);

    expect(v1.isActive()).toBe(true);
  });

  test("isActive returns false if vehicle health is 0 or there are no operators with health more than 0", () => {
    const s1 = new Soldier(0, 1000, 30);
    const s2 = new Soldier(0, 1000, 30);

    const s3 = new Soldier(100, 1000, 30);
    const s4 = new Soldier(80, 1000, 30);

    const v1 = new Vehicle(20, 1500, [s1, s2]);
    expect(v1.isActive()).toBe(false);

    const v2 = new Vehicle(0, 1500, [s3, s4]);
    expect(v1.isActive()).toBe(false);
  });
});

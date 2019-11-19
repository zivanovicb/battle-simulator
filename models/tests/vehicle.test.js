const sinon = require("sinon");
const Vehicle = require("../vehicle");
const Soldier = require("../soldier");
const {
  ERR_VEHICLE_RECHARGE_AMOUNT,
  ERR_NUM_OF_OPERATORS_PER_VEHICLE
} = require("../../constants");
const factories = require("../../helpers/factories");

describe("VehicleModel", () => {
  beforeAll(() => {
    // Create a spy on console (console.log in this case) and provide some mocked implementation
    // In mocking global objects it's usually better than simple `jest.fn()`
    // because you can `unmock` it in clean way doing `mockRestore`
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterAll(() => {
    console.log.mockRestore();
  });

  afterEach(() => {
    console.log.mockClear();
  });

  test("constructor param validation", () => {
    expect(() => new Vehicle(100, 900, 2)).toThrowError(ERR_VEHICLE_RECHARGE_AMOUNT);
    expect(() => new Vehicle(30, 1001, 0)).toThrowError(ERR_NUM_OF_OPERATORS_PER_VEHICLE);
  });

  test("can be instanciated", () => {
    const v = new Vehicle(100, 1100, 2);

    expect(v.health).toBe(100);
    expect(v.recharge).toBe(1100);
    expect(v.operators.length).toBe(2);
  });

  /* 
    The total damage inflicted on the vehicle is distributed to the operators as follows: 30% of the total
    damage is inflicted on the vehicle, 50% of the total damage is inflicted on a single random vehicle
    perator. 
    The rest of the damage is inflicted evenly to the other operators. If there are no additional vehicle
    operators, the rest of the damage is applied to the vehicle.
  */

  test("receiveDamage properly distributes dmg to the vehicle, single random operator and the rest to the vehicle", () => {
    const v1 = new Vehicle(100, 1200, 5);
    const s1 = new Soldier(100, 500, 50);

    v1.operators = [s1];

    v1.receiveDamage(2);

    // initial 30% on vehicle, and then %20 because there is only one operator in the vehicle
    expect(v1.health).toBe(99);
    expect(v1.operators[0].health).toBe(100 - 1);
  });

  test("receiveDamage properly distributes dmg to the vehicle, single random operator and the rest evenly to operators", () => {
    const v1 = new Vehicle(100, 1200, 5);
    const s1 = new Soldier(100, 500, 50);
    const s2 = new Soldier(80, 500, 50);
    const s3 = new Soldier(60, 500, 50);

    v1.operators = [s1, s2, s3];

    v1.receiveDamage(2);

    expect(v1.health).toBe(99.4);
  });

  test("isActive returns false true only if there are operators with health > 0 and vehicle health > 0", () => {
    const v1 = new Vehicle(100, 1200, 5);
    const v2 = new Vehicle(0, 1200, 5);
    const v3 = new Vehicle(100, 1200, 5);

    const s1 = new Soldier(0, 500, 50);
    const s2 = new Soldier(0, 500, 50);
    const s3 = new Soldier(0, 500, 50);

    const s4 = new Soldier(100, 500, 50);
    const s5 = new Soldier(100, 500, 50);
    const s6 = new Soldier(100, 500, 50);

    const s7 = new Soldier(100, 500, 50);
    const s8 = new Soldier(100, 500, 50);
    const s9 = new Soldier(100, 500, 50);

    v1.operators = [s1, s2, s3];
    expect(v1.isActive()).toBe(false);

    v2.operators = [s4, s5, s6];
    expect(v2.isActive()).toBe(false);

    v3.operators = [s7, s8, s9];
    expect(v3.isActive()).toBe(true);
  });

  test("checkDamage logs damage afflicted by vehicle", () => {
    const v1 = new Vehicle(100, 1200, 5);
    v1.checkDamage("idkSquad");
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  test("getAttackSuccessProbability computes", () => {
    const v1 = new Vehicle(100, 1200, 5);
    const s1 = new Soldier(0, 500, 50);
    const s2 = new Soldier(0, 500, 50);
    const s3 = new Soldier(0, 500, 50);

    v1.operators = [s1, s2, s3];

    const rndSpy = jest.spyOn(factories, "rnd").mockImplementation(() => 4);

    expect(v1.getAttackSuccessProbability()).toBe(0.020000000000000004);
    rndSpy.mockRestore();
  });
});

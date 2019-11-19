const Squad = require("../squad");
const Soldier = require("../soldier");
const Vehicle = require("../vehicle");
const { ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../../constants");
const factories = require("../../helpers/factories");

describe("SquadModel", () => {
  test("constructor param validation", () => {
    expect(() => new Squad(4, 1)).toThrowError(ERR_NUM_OF_UNITS);
    expect(() => new Squad(11, 1)).toThrowError(ERR_NUM_OF_UNITS);
    expect(() => new Squad(5, 4)).toThrowError(ERR_STRATEGY_NUM);
  });

  test("can be instanciated", () => {
    const sq = new Squad(5, 3);

    expect(sq.units.length).toBe(5);
    expect(sq.strategy).toBe(3);
  });

  test("isActive should return false if soldiers have no health but vehicle does", () => {
    const sq = new Squad(5, 3);
    const s1 = Squad.createSoldier();
    const s2 = Squad.createSoldier();
    const v1 = Squad.createVehicle();

    const s1v1 = Squad.createSoldier();

    s1.health = 0;
    s2.health = 0;
    s1v1.health = 0;

    v1.operators = [s1v1];
    v1.health = 30;

    sq.units = [s1, s2, v1];

    expect(sq.isActive()).toBe(false);
  });

  test("the damage received on a successful attack is distributed evenly to all squad members", () => {
    const sq = new Squad(5, 3);
    const s1 = Squad.createSoldier();
    const s2 = Squad.createSoldier();
    const v1 = Squad.createVehicle();

    const s1v1 = Squad.createSoldier();

    s1.health = 50;
    s2.health = 30;
    s1v1.health = 0;

    v1.operators = [s1v1];
    v1.health = 30;

    sq.units = [s1, s2, v1];

    const totalDamageDealt = 5;

    // 2 because of two ACTIVE units
    const perUnitDamageReceived = totalDamageDealt / 2;
    sq.receiveDamage(totalDamageDealt);

    // Soldiers
    expect(sq.units[0].health).toBe(50 - perUnitDamageReceived);
    expect(sq.units[1].health).toBe(30 - perUnitDamageReceived);
  });

  test("computes attackSuccessProbability", () => {
    const sq = new Squad(5, 3);
    const s1 = Squad.createSoldier();
    const s2v1 = Squad.createSoldier();

    s1.health = 30;
    s1.experience = 30;

    const v1 = Squad.createVehicle();

    s2v1.health = 50;
    s2v1.experience = 50;

    v1.operators = [s2v1];
    v1.health = 30;

    sq.units = [s1, v1];

    const rndSpy = jest.spyOn(factories, "rnd").mockImplementation(() => 4);
    expect(sq.getAttackSuccessProbability()).toBe(0.022516660498395406);
    rndSpy.mockRestore();
  });

  test("computes attackDamage", () => {
    const sq = new Squad(5, 3);
    const s1 = Squad.createSoldier();
    const s2v1 = Squad.createSoldier();

    s1.health = 30;
    s1.experience = 30;

    const v1 = Squad.createVehicle();
    s2v1.health = 50;
    s2v1.experience = 50;

    v1.operators = [s2v1];
    sq.units = [s1, v1];

    expect(sq.getAttackDamage()).toBe(0.95);
  });

  test("cant sort squads by points", () => {
    const strongest = new Squad(10, 1);
    const weakest = new Squad(5, 1);
    const middle = new Squad(7, 1);

    const sortedSquads = Squad.sortSquadsByPoints([weakest, strongest, middle]);
    expect(sortedSquads[0].points).toBeGreaterThan(sortedSquads[1].points);
    expect(sortedSquads[1].points).toBeGreaterThan(sortedSquads[2].points);
  });

  test("can get right squad to attack if strategy=1 is chosen", () => {
    const strongest = new Squad(10, 1);
    const strongest2 = new Squad(6, 1);

    const s1str2 = Squad.createSoldier();
    s1str2.health = 100;
    s1str2.experience = 50;

    const s2str2 = Squad.createSoldier();
    s2str2.health = 100;
    s2str2.experience = 50;

    const s3str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s4str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s5str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s6str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s7str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s8str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    strongest2.units = [s1str2, s2str2, s3str2, s4str2, s5str2, s6str2, s7str2, s8str2];
    const weakest = new Squad(5, 2);
    const weakest2 = new Squad(5, 2);

    const random = new Squad(6, 3);

    const chosenSquadToAttack = strongest.getSquadToAttack([strongest2, weakest, weakest2, random]);
    expect(Squad.getPoints(strongest2)).toBe(Squad.getPoints(chosenSquadToAttack));
  });

  test("can get right squad to attack if strategy=2 is chosen", () => {
    const strongest = new Squad(10, 1);
    const strongest2 = new Squad(6, 1);

    const s1str2 = Squad.createSoldier();
    s1str2.health = 100;
    s1str2.experience = 50;

    const s2str2 = Squad.createSoldier();
    s2str2.health = 100;
    s2str2.experience = 50;

    const s3str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s4str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s5str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s6str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s7str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s8str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    strongest2.units = [s1str2, s2str2, s3str2, s4str2, s5str2, s6str2, s7str2, s8str2];
    const weakest = new Squad(5, 2);

    const weakest2 = new Squad(5, 2);
    weakest2.units = [];

    const random = new Squad(6, 3);

    const chosenSquadToAttack = weakest.getSquadToAttack([strongest, strongest2, weakest2, random]);
    expect(Squad.getPoints(weakest2)).toBe(Squad.getPoints(chosenSquadToAttack));
  });

  test("can get right squad to attack if strategy=3 is chosen", () => {
    const strongest = new Squad(10, 1);
    const strongest2 = new Squad(6, 1);

    const s1str2 = Squad.createSoldier();
    s1str2.health = 100;
    s1str2.experience = 50;

    const s2str2 = Squad.createSoldier();
    s2str2.health = 100;
    s2str2.experience = 50;

    const s3str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s4str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s5str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s6str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s7str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    const s8str2 = Squad.createSoldier();
    s3str2.health = 100;
    s3str2.experience = 50;

    strongest2.units = [s1str2, s2str2, s3str2, s4str2, s5str2, s6str2, s7str2, s8str2];
    const weakest = new Squad(5, 2);

    const weakest2 = new Squad(5, 2);
    weakest.units2 = [];

    const random = new Squad(6, 3);

    expect(random.getSquadToAttack([strongest, strongest2, weakest2, weakest])).not.toBe(undefined);
  });

  test("can create unit", () => {
    let rndSpy = jest.spyOn(factories, "rnd").mockImplementationOnce(() => 4);

    const u1 = Squad.createUnit("randomSquadName");
    expect(u1 instanceof Soldier).toBe(true);
    rndSpy.mockRestore();

    rndSpy = jest.spyOn(factories, "rnd").mockImplementationOnce(() => 0.1);
    const u2 = Squad.createUnit("randomSquadName");
    expect(u2 instanceof Vehicle).toBe(true);
    rndSpy.mockRestore();
  });

  test("can make all units recharge", () => {
    const sq = new Squad(5, 3);
    const s1 = Squad.createSoldier();
    const s2v1 = Squad.createSoldier();

    s1.health = 30;
    s1.experience = 30;

    const v1 = Squad.createVehicle();

    s2v1.health = 50;
    s2v1.experience = 50;

    v1.operators = [s2v1];
    v1.health = 30;

    sq.units = [s1, v1];

    s1.rechargeForNextAttack = jest.fn();
    v1.rechargeForNextAttack = jest.fn();

    sq.rechargeUnitsForNextAttack();
    expect(s1.rechargeForNextAttack).toHaveBeenCalledTimes(1);
    expect(v1.rechargeForNextAttack).toHaveBeenCalledTimes(1);
  });

  // test("can create vehicle", () => {
  //   let rndSpy = jest
  //     .spyOn(factories, "rnd")
  //     .mockImplementationOnce(() => 80)
  //     .mockImplementationOnce(() => 1200)
  //     .mockImplementationOnce(() => 2);

  //   const v1 = Squad.createVehicle("idkSquad");

  //   expect(v1 instanceof Vehicle).toBe(true);
  //   expect(v1.squadName).toBe("idkSquad");
  //   expect(v1.operators.length).toBe(2);
  //   expect(v1.recharge).toBe(1200);
  //   rndSpy.mockRestore();
  // });

  test("can log how much damage has been done by each unit", () => {
    const sq = new Squad(5, 3);
    const s1 = Squad.createSoldier();
    const s2v1 = Squad.createSoldier();

    s1.health = 30;
    s1.experience = 30;

    const v1 = Squad.createVehicle();

    s2v1.health = 50;
    s2v1.experience = 50;

    v1.operators = [s2v1];
    v1.health = 30;

    sq.units = [s1, v1];

    s1.checkDamage = jest.fn();
    v1.checkDamage = jest.fn();

    sq.checkAttackDamage("idkSquad");
    expect(s1.checkDamage).toHaveBeenCalledTimes(1);
    expect(v1.checkDamage).toHaveBeenCalledTimes(1);
  });
});

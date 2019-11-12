const sinon = require("sinon");
const Squad = require("../squad");
const Soldier = require("../soldier");
const Vehicle = require("../vehicle");
const { ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../../constants");

// manually create and restore the sandbox
let sandbox;

describe("SquadModel", () => {
  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

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
    const perUnitDamageReceived = totalDamageDealt / 3;
    sq.receiveDamage(totalDamageDealt);

    // Soldiers
    expect(sq.units[0].health).toBe(50 - perUnitDamageReceived);
    expect(sq.units[1].health).toBe(30 - perUnitDamageReceived);
  });

  test("computes attackSuccessProbability", () => {
    // Stub out Math.random so it always returns '1'
    sandbox.stub(Math, "random").returns(1);

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

    expect(sq.getAttackSuccessProbability()).toBe(0.0069821200218844704);
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
});

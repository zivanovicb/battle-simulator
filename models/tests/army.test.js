const Army = require("../army");
const { ERR_NUM_OF_SQUADS, ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../../constants");

describe("ArmyModel", () => {
  test("constructor param validation", () => {
    expect(() => new Army(1, 1, 5, "rnd", 1)).toThrowError(ERR_NUM_OF_SQUADS);

    expect(() => new Army(1, 3, 4, "rnd", 1)).toThrowError(ERR_NUM_OF_UNITS);
    expect(() => new Army(1, 3, 11, "rnd", 6)).toThrowError(ERR_NUM_OF_UNITS);

    expect(() => new Army(1, 3, 5, "rnd", 6)).toThrowError(ERR_STRATEGY_NUM);

    expect(() => new Army(1, 3, 5, "rnd", 2)).not.toThrow();
    expect(() => new Army(1, 3, 10, "rnd", 3)).not.toThrow();
  });

  test("should be able to instanciate", () => {
    const id = 1;
    const name = "Army No.1";
    const strategyNum = 1;
    const squadsNum = 3;
    const unitsNum = 6;

    const a = new Army(id, squadsNum, unitsNum, name, strategyNum);

    expect(a.id).toBe(id);
    expect(a.squads.length).toBe(squadsNum);
    expect(a.name).toBe(name);
    expect(a.strategy).toBe(strategyNum);
  });

  test("can create list of squads", () => {
    const name = "Army No.1";
    const strategyNum = 1;
    const squadsNum = 3;
    const unitsNum = 6;

    const a = new Army(1, squadsNum, unitsNum, name, strategyNum);
    a.createSquads(squadsNum, unitsNum);
    expect(a.squads.length).toBe(squadsNum);
    expect(a.squads[0].units.length).toBe(unitsNum);
  });

  test("getStrategy returns right title for strategy", () => {
    const name = "Army No.1";
    const strategyNum = 1;
    const squadsNum = 3;
    const unitsNum = 6;

    const a = new Army(1, squadsNum, unitsNum, name, strategyNum);
    expect(a.getStrategy()).toBe("strongest");
  });
});

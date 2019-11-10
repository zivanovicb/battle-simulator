const Army = require("../army");
const Squad = require("../squad");
const { createSquads } = require("../../helpers/factories");

describe("ArmyModel", () => {
  test("should throw if squads are not array", () => {
    expect(() => new Army("wrongType", "random", 1)).toThrow();
  });

  test("should throw if squads are not squad objects", () => {
    expect(() => new Army([...createSquads(2, 5), "wrongType"])).toThrow();
  });

  test("should throw if less than 2 squads", () => {
    expect(() => new Army(createSquads(1, 6))).toThrow();
  });

  test("should be able to instanciate", () => {
    expect(() => {
      const name = "Army No.1";
      const strategyNum = 1;
      const squadsNum = 3;
      const unitsNum = 6;

      const a = new Army(createSquads(squadsNum, unitsNum), name, strategyNum);

      expect(a.squads.length).toBe(squadsNum);
      expect(a.name).toBe(name);
      expect(a.strategy).toBe(strategyNum);
    }).not.toThrow();
  });

  test("getStrategy returns right title for strategy", () => {
    const name = "Army No.1";
    const strategyNum = 1;
    const squadsNum = 3;
    const unitsNum = 6;

    const a = new Army(createSquads(squadsNum, unitsNum), name, strategyNum);
    expect(a.getStrategy(1)).toBe("strongest");
    expect(a.getStrategy(2)).toBe("weakest");
    expect(a.getStrategy(3)).toBe("random");
    expect(a.getStrategy()).toBe("strongest");
  });
});

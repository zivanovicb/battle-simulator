const {
  getNumOfArmies,
  parseNumOfArmies,
  getNumOfSquads,
  parseNumOfSquads,
  parseNumOfUnits,
  getNumOfUnits,
  getStrategy,
  parseStrategyNum
} = require("../battleInput");

describe("parseNumOfArmies", () => {
  test("should throw if input is text", () => {
    expect(() => {
      parseNumOfArmies("wrong input");
    }).toThrow();
  });

  test("should throw if input is less than 2", () => {
    expect(() => {
      parseNumOfArmies("1");
    }).toThrow();
  });

  test("should return a number if input is 2", () => {
    expect(parseNumOfArmies("2")).toBe(2);
  });

  test("should return a number if input is more than 2", () => {
    expect(parseNumOfArmies("5")).toBe(5);
  });
});

describe("getNumOfArmies", () => {
  test("should call getNumOfArmies again if input is wrong", async () => {
    const fn = jest.fn();
    await getNumOfArmies(fn, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should NOT call getNumOfArmies again if input is ok (5)", async () => {
    const fn = jest.fn();
    await getNumOfArmies(fn, "5");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("parseNumOfSquads", () => {
  test("should throw if input is text", () => {
    expect(() => {
      parseNumOfSquads("wrong input");
    }).toThrow();
  });

  test("should throw if input is less than 2", () => {
    expect(() => {
      parseNumOfSquads("1");
    }).toThrow();
  });

  test("should return a number if input is 2", () => {
    expect(parseNumOfSquads("2")).toBe(2);
  });

  test("should return a number if input is more than 2", () => {
    expect(parseNumOfSquads("5")).toBe(5);
  });
});

describe("getNumOfSquads", () => {
  test("should call getNumOfSquads again if input is wrong", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should NOT call getNumOfSquads again if input is ok (5)", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "5");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("parseNumOfUnits", () => {
  test("should throw if input is text", () => {
    expect(() => {
      parseNumOfUnits("wrong input");
    }).toThrow();
  });

  test("should throw if input is less than 5", () => {
    expect(() => {
      parseNumOfUnits("4");
    }).toThrow();
  });

  test("should throw if input is more than 10", () => {
    expect(() => {
      parseNumOfUnits("11");
    }).toThrow();
  });

  test("should return a number if input is somewhere between 5 and 10 (5 <= n <= 10) - 7", () => {
    expect(parseNumOfUnits("6")).toBe(6);
  });
});

describe("getNumOfUnits", () => {
  test("should call getNumOfUnits again if input is wrong", async () => {
    const fn = jest.fn();
    await getNumOfUnits(1, fn, 3, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should NOT call getNumOfSquads again if input is ok (7)", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "7");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("getStrategy", () => {
  test("should call getStrategy again if input is wrong", async () => {
    const fn = jest.fn();
    await getStrategy(1, fn, 3, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should NOT call getStrategy again if input is ok (1)", async () => {
    const fn = jest.fn();
    await getStrategy(1, fn, 3, "1");
    expect(fn).toHaveBeenCalledTimes(0);
  });

  test("should NOT call getStrategy again if input is ok (2)", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "2");
    expect(fn).toHaveBeenCalledTimes(0);
  });

  test("should NOT call getStrategy again if input is ok (3)", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "3");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("parseStrategyNum", () => {
  test("should throw if input is text", () => {
    expect(() => {
      parseStrategyNum("wrong input");
    }).toThrow();
  });

  test("should return 1 if input is 1", () => {
    expect(parseStrategyNum("1")).toBe(1);
  });

  test("should return 1 if input is 2", () => {
    expect(parseStrategyNum("2")).toBe(2);
  });

  test("should return 3 if input is 3", () => {
    expect(parseStrategyNum("3")).toBe(3);
  });

  test("should throw if input is anythingelse than 1, 2 or 3", () => {
    expect(() => {
      parseStrategyNum("0");
    }).toThrow();
    expect(() => {
      parseStrategyNum("11");
    }).toThrow();

    expect(() => {
      parseStrategyNum("0");
    }).toThrow();
    expect(() => {
      parseStrategyNum("4");
    }).toThrow();
  });
});

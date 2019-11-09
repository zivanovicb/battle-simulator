const {
  getNumOfArmies,
  parseNumOfArmies,
  getNumOfSquads,
  parseNumOfSquads,
  parseNumOfUnits,
  getNumOfUnits
} = require("../battleInput");

describe("parseNumOfArmies", () => {
  it("should throw if input is text", () => {
    expect(() => {
      parseNumOfArmies("wrong input");
    }).toThrow();
  });

  it("should throw if input is less than 2", () => {
    expect(() => {
      parseNumOfArmies("1");
    }).toThrow();
  });

  it("should return a number if input is 2", () => {
    expect(parseNumOfArmies("2")).toBe(2);
  });

  it("should return a number if input is more than 2", () => {
    expect(parseNumOfArmies("5")).toBe(5);
  });
});

describe("getNumOfArmies", () => {
  it("should call getNumOfArmies again if input is wrong", async () => {
    const fn = jest.fn();
    await getNumOfArmies(fn, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should NOT call getNumOfArmies again if input is ok (5)", async () => {
    const fn = jest.fn();
    await getNumOfArmies(fn, "5");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("parseNumOfSquads", () => {
  it("should throw if input is text", () => {
    expect(() => {
      parseNumOfSquads("wrong input");
    }).toThrow();
  });

  it("should throw if input is less than 2", () => {
    expect(() => {
      parseNumOfSquads("1");
    }).toThrow();
  });

  it("should return a number if input is 2", () => {
    expect(parseNumOfSquads("2")).toBe(2);
  });

  it("should return a number if input is more than 2", () => {
    expect(parseNumOfSquads("5")).toBe(5);
  });
});

describe("getNumOfSquads", () => {
  it("should call getNumOfSquads again if input is wrong", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should NOT call getNumOfSquads again if input is ok (5)", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "5");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

describe("parseNumOfUnits", () => {
  it("should throw if input is text", () => {
    expect(() => {
      parseNumOfUnits("wrong input");
    }).toThrow();
  });

  it("should throw if input is less than 5", () => {
    expect(() => {
      parseNumOfUnits("4");
    }).toThrow();
  });

  it("should throw if input is more than 10", () => {
    expect(() => {
      parseNumOfUnits("11");
    }).toThrow();
  });

  it("should return a number if input is somewhere between 5 and 10 (5 <= n <= 10) - 7", () => {
    expect(parseNumOfUnits("6")).toBe(6);
  });
});

describe("getNumOfUnits", () => {
  it("should call getNumOfUnits again if input is wrong", async () => {
    const fn = jest.fn();
    await getNumOfUnits(1, fn, 3, "wrong input");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should NOT call getNumOfSquads again if input is ok (7)", async () => {
    const fn = jest.fn();
    await getNumOfSquads(1, fn, 3, "7");
    expect(fn).toHaveBeenCalledTimes(0);
  });
});

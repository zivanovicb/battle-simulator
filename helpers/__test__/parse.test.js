const { parseStrategy } = require("../parse");

describe("parseStrategy", () => {
  test("for strategy num(1/2/3) it spits out strategy title", () => {
    expect(parseStrategy(1)).toBe("strongest");
    expect(parseStrategy(2)).toBe("weakest");
    expect(parseStrategy(3)).toBe("random");
    expect(parseStrategy()).toBe("strongest");
  });
});

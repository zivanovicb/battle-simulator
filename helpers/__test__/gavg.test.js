const gavg = require("../gavg");

describe("gavg", () => {
  test("should throw if argument is not array", () => {
    expect(() => {
      gavg("throwing");
    }).toThrow();
  });

  test("should throw if element in array is not a number", () => {
    expect(() => {
      gavg([1, 2, 3, "throwing"]);
    }).toThrow();
  });

  test("should compute geometric mean for array of numbers", () => {
    const arr = [2, 4, 8];
    expect(gavg(arr)).toBe(3.9999999999999996);
  });
});

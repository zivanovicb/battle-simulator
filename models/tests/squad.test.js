const Squad = require("../squad");
const Soldier = require("../soldier");
const Vehicle = require("../vehicle");

const { createUnit } = require("../../helpers/factories");

describe("SquadModel", () => {
  test("should throw if units are not array", () => {
    expect(() => new Squad("wrongType")).toThrow();
  });

  test("should throw if units are not unit objects", () => {
    expect(() => new Squad(["21", createUnit()])).toThrow();
  });

  test("should throw less than 2 units per squad or more than 10", () => {
    expect(() => new Squad([createUnit()])).toThrow();
    expect(() => new Squad(new Array(11).fill(null).map(() => createUnit()))).toThrow();
  });

  test("should not throw if units are all unit objects", () => {
    const u1 = createUnit();
    const u2 = createUnit();
    const u3 = createUnit();

    expect(() => {
      const s = new Squad([u1, u2, u3]);
      expect(s.units.length).toBe(3);
    }).not.toThrow();
  });

  test("isActive should return false if soldiers have no health but vehicle does", () => {
    const s1 = new Soldier(0, 1000, 30);
    const s2 = new Soldier(0, 1000, 30);
    const v1 = new Vehicle(20, 1500, [s1, s2]);
    const sq = new Squad([s1, s2, v1]);
    expect(sq.isActive()).toBe(false);
  });
});

const Soldier = require("../models/soldier");
const Vehicle = require("../models/vehicle");
const Squad = require("../models/squad");

const createSoldier = () => new Soldier(rnd(1, 100), rnd(1000, 2000), rnd(0, 50));
const createVehicle = operators => new Vehicle(rnd(1, 100), (1000, 2000), operators);
const createUnit = () => {
  // Return soldier
  if (Math.random() > 0.5) return createSoldier();
  else {
    const numOfOperators = rnd(1, 3);
    // Return Vehicle
    return createVehicle(
      Array(numOfOperators)
        .fill(null)
        .map(() => createSoldier())
    );
  }
};
const createUnits = numOfUnits => new Array(numOfUnits).fill(null).map(() => createUnit());
const createSquads = (numOfSquads, numOfUnits) =>
  new Array(numOfSquads).fill(null).map(() => new Squad(createUnits(numOfUnits)));

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
  createUnit,
  createSquads,
  createVehicle,
  createSoldier,
  rnd
};

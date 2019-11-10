const Vehicle = require("./vehicle");
const Soldier = require("./soldier");

class Squad {
  constructor(units) {
    if (!Array.isArray(units)) {
      throw new Error("Units parameter should be an array of Soldier and Vehicle objects");
    }

    if (units.filter(u => !(u instanceof Vehicle) && !(u instanceof Soldier)).length > 0) {
      throw new Error("Units parameter should be an array of Soldier and Vehicle objects");
    }

    if (units.length < 2 || units.length > 10) {
      throw new Error("Wrong number. There should be 5 <= n <= 10 units per squad");
    }

    // List of both soldiers and vehicles
    this.units = units;
  }

  isActive() {
    return this.units.filter(u => u.isActive()).length > 0;
  }
}

module.exports = Squad;

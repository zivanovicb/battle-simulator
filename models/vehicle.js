const Unit = require("./unit");

class Vehicle extends Unit {
  constructor() {
    super();
  }

  recharge = 1200;

  // List of soldiers
  operators = [];

  isActive = () => {
    return this.operators.filter((o, i) => o.health > 0).length > 0;
  };
}

module.exports = Vehicle;

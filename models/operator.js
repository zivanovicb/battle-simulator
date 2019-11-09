const Soldier = require("./soldier");

class Operator extends Soldier {
  // If the vehicle is destroyed, any remaining vehicle operator is considered as inactive (killed)
  constructor() {
    super();

    this.isActive = true;
  }
}

module.exports = Operator;

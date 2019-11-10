const Unit = require("./unit");
const gavg = require("../helpers/gavg");

class Vehicle extends Unit {
  constructor(health, recharge, opreators) {
    if (recharge <= 1000) {
      throw new Error("Recharge property must be greater than 1000(ms)");
    }
    super(health, recharge);

    // List of soldiers
    this.operators = opreators;

    // Vehicle health
    this.health = health;

    // Average of all operators health plus vehicle health
    this.totalHealth = this.getTotalHealth();
  }

  // The total health of a vehicle unit is represented as the average health of all its operators and the
  // health of the vehicle
  getTotalHealth() {
    const totalHealth = this.operators.reduce((acc, s) => s.health + acc, 0) + this.health;
    return totalHealth / (this.operators.length + 1);
  }

  getAttackSuccessProbability() {
    const operatorsSuccessRates = this.operators.map(s => s.getAttackSuccessProbability());
    return 0.5 * (1 + this.health / 100) * gavg(operatorsSuccessRates);
  }

  getDamage() {
    const sum = this.operators.reduce((acc, i) => i.experience / 100 + acc, 0);
    return 0.1 + sum;
  }

  isActive() {
    const opHealthTotal = this.operators.reduce((acc, s) => s.health + acc, 0);
    return opHealthTotal > 0 && this.health > 0;
  }
}

module.exports = Vehicle;

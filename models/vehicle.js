const Unit = require("./unit");
const Soldier = require("./soldier");
const gavg = require("../helpers/gavg");
const { rnd } = require("../helpers/factories");
const { ERR_VEHICLE_RECHARGE_AMOUNT, ERR_NUM_OF_OPERATORS_PER_VEHICLE } = require("../constants");

class Vehicle extends Unit {
  constructor(health, recharge, numOfOperators) {
    if (recharge <= 1000) {
      throw new Error(ERR_VEHICLE_RECHARGE_AMOUNT);
    }

    if (numOfOperators < 1) {
      console.log("GETS CALLED???");
      throw new Error(ERR_NUM_OF_OPERATORS_PER_VEHICLE);
    }

    super(health, recharge);

    // List of soldiers
    this.operators = this.createOperators(numOfOperators);

    // Vehicle health
    this.health = health;

    // Average of (all operators health plus vehicle health)
    this.totalHealth = this.getTotalHealth();
  }

  createOperators(numOfOperators) {
    const operators = [];
    for (let i = 0; i < numOfOperators; i++)
      operators.push(new Soldier(rnd(0, 100), rnd(100, 2000), rnd(0, 50)));

    return operators;
  }

  // The total health of a vehicle unit is represented as the average health of all its operators and the
  // health of the vehicle
  getTotalHealth() {
    const totalHealth = this.operators.reduce((acc, s) => s.health + acc, 0) + this.health;
    return totalHealth / (this.operators.length + 1);
  }

  /* 
    The total damage inflicted on the vehicle is distributed to the operators as follows: 30% of the total
    damage is inflicted on the vehicle, 50% of the total damage is inflicted on a single random vehicle
    perator. 
    The rest of the damage is inflicted evenly to the other operators. If there are no additional vehicle
    operators, the rest of the damage is applied to the vehicle.
  */
  receiveDamage(damageReceivedPerUnit) {
    const vehicleDmg = (30 / 100) * damageReceivedPerUnit;

    // We'll chose a random vehicle operator
    const singleVehicleOperatorDmg = (50 / 100) * damageReceivedPerUnit;

    const otherOperatorsDmg = ((20 / 100) * damageReceivedPerUnit) / this.operators.length;

    this.health = this.health - vehicleDmg;
    const randomOperatorIndex =
      this.operators.length > 1 ? Math.round(Math.random(0, this.operators.length - 1)) : 0;

    // Random vehicle operator receives 50% of the total damage dealt to a unit
    this.operators[randomOperatorIndex].receiveDamage(singleVehicleOperatorDmg);

    if (this.operators.length > 1) {
      this.operators.forEach(
        (o, i) => i !== randomOperatorIndex && o.receiveDamage(otherOperatorsDmg)
      );
    } else this.health = this.health - otherOperatorsDmg;
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

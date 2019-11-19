const Unit = require("./unit");
const Soldier = require("./soldier");
const gavg = require("../helpers/gavg");
const { rnd } = require("../helpers/factories");
const { ERR_VEHICLE_RECHARGE_AMOUNT, ERR_NUM_OF_OPERATORS_PER_VEHICLE } = require("../constants");

/**
 * Class representing a vehicle.
 * @extends Unit
 */

class Vehicle extends Unit {
  /**
   * Create a vehicle.
   * @param {number} health -Represents the health of the vehicle
   * @param {number} recharge - Represents the number of ms required to recharge the Vehicle for an attack(1001-2000ms)
   * @param {number} numOfOperators - Number of soldiers who are controlling vehicle
   * @param {string} squadName - Squad name
   */
  constructor(health, recharge, numOfOperators, squadName) {
    if (recharge <= 1000) {
      throw new Error(ERR_VEHICLE_RECHARGE_AMOUNT);
    }

    if (numOfOperators < 1) {
      throw new Error(ERR_NUM_OF_OPERATORS_PER_VEHICLE);
    }

    super(health, recharge, "Vehicle", squadName);

    // Array of soldiers
    this.operators = this.createOperators(numOfOperators);

    // Vehicle health
    this.health = health;

    // Average of (all operators health plus vehicle health)
    this.totalHealth = this.getTotalHealth();
  }

  /**
   * Return an array of soldiers who are going to control the vehicle.
   * @param {number} numOfOperators - Number of soldiers who are controlling vehicle
   * @return {Soldier[]} Array of soldiers
   */
  createOperators(numOfOperators) {
    const operators = [];
    for (let i = 0; i < numOfOperators; i++)
      operators.push(new Soldier(rnd(1, 100), rnd(100, 2000), rnd(0, 50), this.squadName));

    return operators;
  }

  /**
   * Get the total health of a vehicle unit which is represented as the average health of all its operators and the health of the vehicle.
   * @return {number} Array of soldiers
   */
  getTotalHealth() {
    const totalHealth = this.operators.reduce((acc, s) => s.health + acc, 0) + this.health;
    return totalHealth / (this.operators.length + 1);
  }

  /**
   * The total damage inflicted on the vehicle is distributed to the operators as follows: 30% of the total damage is inflicted on the vehicle,
   * 50% of the total damage is inflicted on a single random vehicle operator.
   * The rest of the damage is inflicted evenly to the other operators. If there are no additional vehicle
   * operators, the rest of the damage is applied to the vehicle.
   * @param {number} damageReceivedPerUnit - Damage received per unit when the entire squad has been under attack
   */
  receiveDamage(damageReceivedPerUnit) {
    const vehicleDmg = (30 / 100) * damageReceivedPerUnit;

    super.receiveDamage(vehicleDmg);

    // We'll chose a random vehicle operator
    const singleVehicleOperatorDmg = (50 / 100) * damageReceivedPerUnit;

    const restDmg = ((20 / 100) * damageReceivedPerUnit) / this.operators.length;

    const randomOperatorIndex =
      this.operators.length > 1 ? Math.round(rnd(0, this.operators.length - 1)) : 0;

    // Random vehicle operator receives 50% of the total damage dealt to a unit
    this.operators[randomOperatorIndex].receiveDamage(singleVehicleOperatorDmg);

    if (this.operators.length > 1) {
      this.operators.forEach((o, i) => i !== randomOperatorIndex && o.receiveDamage(restDmg));
    } else {
      super.receiveDamage(restDmg);
    }
  }

  /**
   * Compute vehicle's attack success probability.
   * The vehicle attack success probability is determined as follows:
   * 0.5 * (1 + vehicle.health / 100) * gavg(operators.attack_success).
   * @return {number}
   */
  getAttackSuccessProbability() {
    const operatorsSuccessRates = this.operators.map(s => s.getAttackSuccessProbability());
    return 0.5 * (1 + this.health / 100) * gavg(operatorsSuccessRates);
  }

  /**
   * Get damage vehicle can do to the enemy squad.
   * The damage afflicted by a vehicle is calculated:
   * 0.1 + sum(operators.experience / 100).
   * @return {number}
   */
  getDamage() {
    const sum = this.operators.reduce((acc, i) => i.experience / 100 + acc, 0);
    const dmg = 0.1 + sum;
    return dmg;
  }

  /**
   * Write to the console how much damage a vehicle has done to the enemy squad.
   * @param {string} enemySquadName
   */
  checkDamage(enemySquadName) {
    const dmg = this.getDamage();
    console.log(
      `===> Squad(${this.squadName}): Vehicle(${this.name}) did ${dmg} damage to Squad(${enemySquadName})!`
    );
  }

  /**
   * Check if vehicle is active.
   * A vehicle is considered active as long as it has any amount of health and there is a vehicle operator with health.
   * If the vehicle is destroyed, any remaining vehicle operator is considered as inactive (killed).
   * @return {boolean}
   */
  isActive() {
    const opHealthTotal = this.operators.reduce((acc, s) => s.health + acc, 0);
    return opHealthTotal > 0 && this.health > 0;
  }
}

module.exports = Vehicle;

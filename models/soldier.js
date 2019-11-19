const Unit = require("./unit");
const { ERR_EXPERIENCE_AMOUNT } = require("../constants");
const factories = require("../helpers/factories");

/**
 * Class representing a soldier.
 * @extends Unit
 */

class Soldier extends Unit {
  /**
   * Create a soldier.
   * @param {number} health - Represents the health of the Soldier (0-100)%
   * @param {number} recharge - Represents the number of ms required to recharge the Soldier for an attack (100-2000)ms
   * @param {number} experience - Represents the soldier experience(0-50)
   * @param {string} squadName - Squad name
   */
  constructor(health, recharge, experience, squadName) {
    if (experience < 0 || experience > 50) {
      throw new Error(ERR_EXPERIENCE_AMOUNT);
    }

    super(health, recharge, "Soldier", squadName);

    this.experience = experience;
  }

  /**
   * Check if soldier is active. Soldier is considered active if it has more than 0 health.
   * @return {boolean}
   */
  isActive() {
    return this.health > 0;
  }

  /**
   * Compute attack success probability for soldier.
   * @return {number}
   */
  getAttackSuccessProbability() {
    return (0.5 * (1 + this.health / 100) * factories.rnd(30 + this.experience, 100)) / 100;
  }

  /**
   * Get the soldier's damage based on experience.
   * @return {number}
   */
  getDamage() {
    const dmg = 0.05 + this.experience / 100;
    return dmg;
  }

  /**
   * Write to the console how much damage soldier has done to an enemy squad.
   * @param {string} enemySquadName
   */
  checkDamage(enemySquadName) {
    const dmg = this.getDamage();
    console.log(
      `===> Squad(${this.squadName}): Soldier(${this.name}) did ${dmg} damage to Squad(${enemySquadName})!`
    );
  }
}

module.exports = Soldier;

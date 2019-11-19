const randomWord = require("random-word");
const { ERR_HEALTH_AMOUNT, ERR_UNIT_RECHARGE_AMOUNT } = require("../constants");

/**
 * Class representing a unit.
 */

class Unit {
  /**
   * Create a unit.
   * @param {number} health - Represents the health of the unit (0-100)%
   * @param {number} recharge - Represents the number of ms required to recharge the unit for an attack (100-2000)ms
   * @param {"Vehicle" | "Soldier"} type - Represents type of the unit
   * @param {string} squadName - Squad name
   */
  constructor(health, recharge, type, squadName) {
    if (health < 0 || health > 100) {
      throw new Error(ERR_HEALTH_AMOUNT);
    }

    if (recharge < 100 || recharge > 2000) {
      throw new Error(ERR_UNIT_RECHARGE_AMOUNT);
    }

    this.health = health;
    this.recharge = recharge;
    this.isReady = true;
    this.type = type;
    this.name = randomWord();
    this.squadName = squadName;
  }

  /**
   * Make unit not ready for certain amount of miliseconds.
   */
  rechargeForNextAttack() {
    this.isReady = false;

    setTimeout(() => {
      this.isReady = true;
    }, this.recharge);
  }

  /**
   * Check if unit is active. Unit is considered active if it has more than 0 health.
   * @return {boolean}
   */
  isActive() {
    return this.health > 0;
  }

  /**
   * Make unit receive certain amount of damage.
   * If unit is already inactive nothing will happen.
   */
  receiveDamage(dmg) {
    if (this.health <= 0) return;

    console.log(
      `===> Squad(${this.squadName}): ${this.type} (${this.name}) received ${dmg} damage. ${this.health} health left!`
    );

    this.health = Math.max(0, this.health - dmg);
    if (this.health === 0) {
      console.log(
        `===> Squad(${this.squadName}): ${this.type}(${this.name}) just got killed/destroyed!`
      );
    }
  }
}

module.exports = Unit;

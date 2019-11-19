const randomWord = require("random-word");
const { ERR_HEALTH_AMOUNT, ERR_UNIT_RECHARGE_AMOUNT } = require("../constants");

class Unit {
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

  rechargeForNextAttack() {
    this.isReady = false;

    setTimeout(() => {
      this.isReady = true;
    }, this.recharge);
  }

  isActive() {
    return this.health > 0;
  }

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

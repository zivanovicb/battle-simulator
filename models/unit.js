const { ERR_HEALTH_AMOUNT, ERR_UNIT_RECHARGE_AMOUNT } = require("../constants");

class Unit {
  constructor(health, recharge) {
    if (health < 0 || health > 100) {
      throw new Error(ERR_HEALTH_AMOUNT);
    }

    if (recharge < 100 || recharge > 2000) {
      throw new Error(ERR_UNIT_RECHARGE_AMOUNT);
    }

    this.health = health;
    this.recharge = recharge;
    this.isReady = true;
  }

  rechargeForNextAttack() {
    this.isReady = false;
    setTimeout(() => (this.isReady = true), this.recharge);
  }

  isActive() {
    return this.health > 0;
  }

  receiveDamage(dmg) {
    this.health = this.health - dmg;
  }
}

module.exports = Unit;

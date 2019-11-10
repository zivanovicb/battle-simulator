class Unit {
  constructor(health, recharge) {
    if (health < 0 || health > 100) {
      throw new Error("Health should be a number between 0 and 100");
    }

    if (recharge < 100 || recharge > 2000) {
      throw new Error("Recharge should be a number between 0 and 100");
    }

    this.health = health;
    this.recharge = recharge;
  }

  isActive() {
    return this.health > 0;
  }
}

module.exports = Unit;

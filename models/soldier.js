const Unit = require("./unit");

class Soldier extends Unit {
  constructor(health, recharge, experience) {
    super(health, recharge);
    if (experience < 0 || experience > 50) {
      throw new Error("Health should be a number between 0 and 50");
    }
    this.experience = experience;
  }

  isActive() {
    return this.health > 0;
  }

  getAttackSuccessProbability() {
    return (0.5 * (1 + this.health / 100) * Math.random(30 + this.experience, 100)) / 100;
  }
  getDamage() {
    return 0.05 + this.experience / 100;
  }
}

module.exports = Soldier;

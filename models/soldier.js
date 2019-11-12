const Unit = require("./unit");
const { ERR_EXPERIENCE_AMOUNT } = require("../constants");

class Soldier extends Unit {
  constructor(health, recharge, experience) {
    if (experience < 0 || experience > 50) {
      throw new Error(ERR_EXPERIENCE_AMOUNT);
    }

    super(health, recharge);

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

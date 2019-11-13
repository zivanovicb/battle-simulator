const Unit = require("./unit");
const { ERR_EXPERIENCE_AMOUNT } = require("../constants");

class Soldier extends Unit {
  constructor(health, recharge, experience, squadName) {
    if (experience < 0 || experience > 50) {
      throw new Error(ERR_EXPERIENCE_AMOUNT);
    }

    super(health, recharge, "Soldier", squadName);

    this.experience = experience;
  }

  isActive() {
    return this.health > 0;
  }

  getAttackSuccessProbability() {
    return (0.5 * (1 + this.health / 100) * Math.random(30 + this.experience, 100)) / 100;
  }

  // enemySquadName will be undefined for calls that only do 'damage checking' and not 'damage dealing'
  getDamage(enemySquadName) {
    const dmg = 0.05 + this.experience / 100;
    if (enemySquadName !== undefined) {
      console.log(
        `===> Squad(${this.squadName}): Soldier(${this.name}) did ${dmg} damage to Squad(${enemySquadName})!`
      );
    }

    return dmg;
  }
}

module.exports = Soldier;

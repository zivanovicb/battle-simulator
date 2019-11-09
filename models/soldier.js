const Unit = require("./unit");

class Soldier extends Unit {
  constructor(health, recharge, experience) {
    super(health, recharge);
    this.experience = experience;

    this.isActive = () => {
      console.log("[isActive]", { health: this.health });
      return this.health >= 0;
    };

    this.getAttackSuccessProbability = () => {
      return (
        (0.5 *
          (1 + this.health / 100) *
          Math.random(30 + this.experience, 100)) /
        100
      );
    };

    this.getDamage = () => {
      return 0.05 + this.experience / 100;
    };
  }
}

module.exports = Soldier;

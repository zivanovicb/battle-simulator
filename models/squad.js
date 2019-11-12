const Vehicle = require("./vehicle");
const Soldier = require("./soldier");
const gavg = require("../helpers/gavg");
const { rnd } = require("../helpers/factories");
const { ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../constants");

const STATE_CHECK_INTERVAL_MS = 500;

class Squad {
  constructor(numOfUnits, strategyNum) {
    if (numOfUnits < 5 || numOfUnits > 10) {
      throw new Error(ERR_NUM_OF_UNITS);
    }

    if (strategyNum !== 1 && strategyNum !== 2 && strategyNum !== 3) {
      throw new Error(ERR_STRATEGY_NUM);
    }

    this.strategy = strategyNum;

    // Interval gets set when squad starts fighting
    this.stateCheckInterval = null;

    // List of both soldiers and vehicles
    this.units = Squad.createUnits(numOfUnits);
    this.getTotalHealth = this.getTotalHealth.bind(this);
    this.getTotalExperience = this.getTotalExperience.bind(this);
    this.getAttackDamage = this.getAttackDamage.bind(this);
  }

  static createUnits(numOfUnits) {
    let units = [];
    for (let i = 0; i < numOfUnits; i++) units.push(this.createUnit());
    return units;
  }

  static createUnit() {
    // Return soldier
    if (Math.random() > 0.5) return this.createSoldier();
    // Return Vehicle
    else return this.createVehicle();
  }

  static createVehicle() {
    return new Vehicle(rnd(1, 100), rnd(1001, 2000), rnd(1, 3));
  }

  static createSoldier() {
    return new Soldier(rnd(0, 100), rnd(100, 2000), rnd(0, 50));
  }

  isActive() {
    return this.units.filter(u => u.isActive()).length > 0;
  }

  // The damage received on a successful attack is distributed evenly to all squad members
  receiveDamage(totalDamageDealt) {
    const damageReceivedPerUnit = totalDamageDealt / this.units.length;
    console.log("[Squad.receiveDamage]", { damageReceivedPerUnit, unitsLength: this.units.length });
    this.units.forEach(u => u.receiveDamage(damageReceivedPerUnit));
  }

  // The damage inflicted on a successful attack is the accumulation of the damage inflicted by each squad member
  getAttackDamage() {
    return this.units.reduce((acc, u) => u.getDamage() + acc, 0);
  }

  getTotalExperience() {
    return this.units.reduce((acc, u) => {
      if (!(u instanceof Vehicle)) return u.experience + acc;
      else return u.operators.reduce((acc, o) => o.experience + acc, 0);
    }, 0);
  }

  getTotalHealth() {
    return this.units.reduce((acc, u) => u.health + acc, 0);
  }

  getAttackSuccessProbability() {
    const chances = this.units.map(u => u.getAttackSuccessProbability());
    return gavg(chances);
  }

  startFighting(enemySquads) {
    console.log("[startFighting]", { enemySquads });
    const allUnitsReady = this.units.filter(u => u.isReady).length === this.units.length;

    this.stateCheckInterval = setInterval(() => {
      if (this.isActive() && enemySquads.filter(s => s.isActive()).length > 0) {
        console.log("GOING TO ATTAC", { allUnitsReady });
        const a = this.getSquadToAttack(enemySquads);
        console.log("OK I GOT SQUAD TO ATTAC", a);
      } else {
        console.log("[startFigthing] stopping interval");
      }
    }, STATE_CHECK_INTERVAL_MS);
  }

  static getPoints(s) {
    return s.getTotalHealth() + s.getTotalExperience() + s.getAttackDamage();
  }

  static getSquadsWithPoints(enemySquads) {
    return enemySquads.map(s => ({
      ...s,
      points: Squad.getPoints(s)
    }));
  }

  static sortSquadsByPoints(enemySquads) {
    return Squad.getSquadsWithPoints(enemySquads).sort((a, b) => b.points - a.points);
  }

  getSquadToAttack(enemySquads) {
    let squadToAttack;

    const sortedSquads = Squad.sortSquadsByPoints(enemySquads);

    if (this.strategy === 1) {
      squadToAttack = sortedSquads[0];
    } else if (this.strategy === 2) {
      console.log("CHOOSING WEAKEST", { sortedSquads });
      squadToAttack = sortedSquads[enemySquads.length - 1];
    } else if (this.strategy === 3) {
      const randomSquadIndex =
        enemySquads.length > 1 ? Math.round(Math.random(0, enemySquads.length - 1)) : 0;

      squadToAttack = sortedSquads[randomSquadIndex];
    }
    return squadToAttack;
  }
}

module.exports = Squad;

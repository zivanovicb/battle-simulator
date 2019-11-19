const Vehicle = require("./vehicle");
const Soldier = require("./soldier");
const randomWord = require("random-word");
const gavg = require("../helpers/gavg");
const factories = require("../helpers/factories");
const { ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../constants");

const STATE_CHECK_INTERVAL_MS = 1000;

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

    this.getTotalHealth = this.getTotalHealth.bind(this);
    this.getTotalExperience = this.getTotalExperience.bind(this);
    this.getAttackDamage = this.getAttackDamage.bind(this);
    this.getAttackSuccessProbability = this.getAttackSuccessProbability.bind(this);
    this.receiveDamage = this.receiveDamage.bind(this);
    this.rechargeUnitsForNextAttack = this.rechargeUnitsForNextAttack.bind(this);
    this.name = randomWord();

    this.hasBeenActive = true;

    // List of both soldiers and vehicles
    this.units = Squad.createUnits(numOfUnits, this.name);
  }

  static createUnits(numOfUnits, squadName) {
    let units = [];
    for (let i = 0; i < numOfUnits; i++) units.push(this.createUnit(squadName));
    return units;
  }

  static createUnit(squadName) {
    // Return soldier
    if (factories.rnd(0, 1) > 0.5) return Squad.createSoldier(squadName);
    // Return Vehicle
    else return Squad.createVehicle(squadName);
  }

  static createVehicle(squadName) {
    return new Vehicle(
      factories.rnd(1, 100),
      factories.rnd(1001, 2000),
      factories.rnd(1, 3),
      squadName
    );
  }

  static createSoldier(squadName) {
    return new Soldier(
      factories.rnd(1, 100),
      factories.rnd(100, 2000),
      factories.rnd(0, 50),
      squadName
    );
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

  isActive() {
    const isActive = this.units.filter(u => u.isActive()).length > 0;
    if (this.hasBeenActive && !isActive) console.log(`==> Squad(${this.name}) got destroyed!`);
    this.hasBeenActive = isActive;
    return isActive;
  }

  // The damage received on a successful attack is distributed evenly to all squad members
  receiveDamage(totalDamageDealt) {
    const activeUnitsLength = this.units.filter(u => u.isActive()).length;
    const damageReceivedPerUnit = totalDamageDealt / activeUnitsLength;
    console.log(`==> Squad(${this.name}) ${totalDamageDealt} damage received!`);
    this.units.forEach(u => {
      if (u.isActive()) u.receiveDamage(damageReceivedPerUnit);
    });
  }

  getAttackDamage() {
    return this.units.reduce((acc, u) => u.getDamage() + acc, 0);
  }

  checkAttackDamage(squadName) {
    this.units.forEach(u => u.checkDamage(squadName));
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

  getAttackSuccessProbability(enemySquadName) {
    const probability = gavg(this.units.map(u => u.getAttackSuccessProbability()));
    console.log(
      `==> Squad(${this.name}) Attack success probability towards Squad(${enemySquadName}) is ${probability}!`
    );
    return probability;
  }

  rechargeUnitsForNextAttack() {
    this.units.forEach(u => u.rechargeForNextAttack());
  }

  fight(enemySquads) {
    return new Promise(resolve => {
      this.stateCheckInterval = setInterval(() => {
        const allUnitsReady = this.units.filter(u => u.isReady).length === this.units.length;
        const activeEnemySquads = enemySquads.filter(s => s.isActive());

        if (this.isActive() && activeEnemySquads.length > 0) {
          // All units recharged - going to attack
          if (allUnitsReady) {
            const s = this.getSquadToAttack(activeEnemySquads);

            if (
              this.getAttackSuccessProbability(s.name) > s.getAttackSuccessProbability(this.name)
            ) {
              const attackerDmgDealt = this.getAttackDamage();

              console.log(
                `==> Squad(${this.name}) did ${attackerDmgDealt} damage to Squad(${s.name})!`
              );

              // Logs individual attack towards defending squad
              this.checkAttackDamage(s.name);

              s.receiveDamage(attackerDmgDealt);
              s.rechargeUnitsForNextAttack();
              this.rechargeUnitsForNextAttack();
            }
            // Units not ready, skipping
          } else {
            console.log(`==> Squad(${this.name}): Recharging...`);
          }
        } else {
          clearInterval(this.stateCheckInterval);
          // Simulation ends when all promises resolve
          resolve();
        }
      }, STATE_CHECK_INTERVAL_MS);
    });
  }

  getSquadToAttack(enemySquads) {
    let squadToAttack;

    const sortedSquads = Squad.sortSquadsByPoints(enemySquads);

    if (this.strategy === 1) {
      squadToAttack = sortedSquads[0];
    } else if (this.strategy === 2) {
      squadToAttack = sortedSquads[enemySquads.length - 1];
    } else if (this.strategy === 3) {
      const randomSquadIndex =
        enemySquads.length > 1 ? Math.round(factories.rnd(0, enemySquads.length - 1)) : 0;

      squadToAttack = sortedSquads[randomSquadIndex];
    }
    return squadToAttack;
  }
}

module.exports = Squad;

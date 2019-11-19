const Squad = require("./squad");
const { parseStrategy } = require("../helpers/parse");
const { ERR_NUM_OF_SQUADS, ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../constants");

/**
 * @typedef {Squad.StrategyNumber} StrategyNumber
 */

/**
 * Class representing an army.
 */
class Army {
  /**
   * Create an army.
   * @param {number} id - Army ID
   * @param {number} numOfSquads - Number of squads per army
   * @param {number} numOfUnits - Number of units per squad
   * @param {string} name - Army name
   * @param {StrategyNumber} strategyNum - Strategy number
   */
  constructor(id, numOfSquads, numOfUnits, name, strategyNum) {
    if (numOfSquads < 2) {
      throw new Error(ERR_NUM_OF_SQUADS);
    }

    if (numOfUnits < 5 || numOfUnits > 10) {
      throw new Error(ERR_NUM_OF_UNITS);
    }

    if (strategyNum !== 1 && strategyNum !== 2 && strategyNum !== 3) {
      throw new Error(ERR_STRATEGY_NUM);
    }

    this.id = id;
    this.name = name;
    this.strategy = strategyNum;

    // Array of squad objects
    this.squads = this.createSquads(numOfSquads, numOfUnits);

    // A function you give a strategy num(1/2/3) and spits out a strategy title
    this.getStrategy = parseStrategy.bind(undefined, this.strategy);
    this.joinBattle = this.joinBattle.bind(this);
  }

  /**
   * Create an array of squads.
   * @param {number} numOfSquads - Number of squads to be returned
   * @param {number} numOfUnits - Number of units per squad
   * @return {Squad[]} Array of squads
   */
  createSquads(numOfSquads, numOfUnits) {
    let squads = [];
    for (let i = 0; i < numOfSquads; i++) squads.push(new Squad(numOfUnits, this.strategy));
    return squads;
  }

  /**
   * Joins battle and resolves when squad is not active anymore or there are no enemy squads left.
   * @param {Army[]} armies - Reference to the array of all armies battling
   */
  async joinBattle(armies) {
    const enemySquads = armies
      .filter(a => a.id !== this.id)
      .reduce((acc, a) => [...acc, ...a.squads], []);
    const squadFightingPromises = [];
    this.squads.forEach(sq => squadFightingPromises.push(sq.fight(enemySquads)));
    await Promise.all(squadFightingPromises);
  }
}

module.exports = Army;

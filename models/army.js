const Squad = require("./squad");
const { parseStrategy } = require("../helpers/parse");
const { ERR_NUM_OF_SQUADS, ERR_NUM_OF_UNITS, ERR_STRATEGY_NUM } = require("../constants");

class Army {
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

    // List of squad objects
    this.squads = this.createSquads(numOfSquads, numOfUnits);

    // A function you give a strategy num(1/2/3) and spits out a strategy title
    this.getStrategy = parseStrategy.bind(undefined, this.strategy);
    this.joinBattle = this.joinBattle.bind(this);
  }

  createSquads(numOfSquads, numOfUnits) {
    let squads = [];
    for (let i = 0; i < numOfSquads; i++) squads.push(new Squad(numOfUnits, this.strategy));
    return squads;
  }

  joinBattle(armies) {
    return new Promise(async (resolve, _) => {
      const enemySquads = armies
        .filter(a => a.id !== this.id)
        .reduce((acc, a) => [...acc, ...a.squads], []);
      const squadFightingPromises = [];
      this.squads.forEach(sq => squadFightingPromises.push(sq.fight(enemySquads)));
      await Promise.all(squadFightingPromises);
      resolve();
    });
  }
}

module.exports = Army;

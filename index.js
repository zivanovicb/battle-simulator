const {
  getNumOfArmies,
  getNumOfSquads,
  getNumOfUnits,
  getStrategy
} = require("./helpers/battleInput");
const Army = require("./models/Army");

const { createSquads } = require("./helpers/factories");

async function main() {
  const numOfArmies = await getNumOfArmies(getNumOfArmies);
  try {
    const armies = await initArmies(numOfArmies);
    armies.forEach(a => a.joinBattle(armies));
  } catch (err) {
    console.log("[main.err]", err.message);
  }
}

const initArmies = numOfArmies => {
  return new Promise(async (resolve, reject) => {
    let armies = [];

    for (let i = 1; i <= numOfArmies; i++) {
      try {
        const numOfSquads = await getNumOfSquads(i, getNumOfSquads, numOfArmies);
        const numOfUnits = await getNumOfUnits(i, getNumOfUnits, numOfArmies);
        const strategyNum = await getStrategy(i, getStrategy, numOfArmies);
        const army = new Army(i, numOfSquads, numOfUnits, `Army No.${i}`, strategyNum);
        armies = [...armies, { i, ...army }];
      } catch (err) {
        console.error("[initArmies]", err.message);
        reject(err.message);
      }
    }

    resolve(armies);
  });
};

main();

const {
  getNumOfArmies,
  getNumOfSquads,
  getNumOfUnits,
  getStrategy
} = require("./helpers/battleInput");

async function main() {
  const numOfArmies = await getNumOfArmies(getNumOfArmies);
  let armies = {};

  for (let i = 1; i <= numOfArmies; i++) {
    const numOfSquads = await getNumOfSquads(i, getNumOfSquads, numOfArmies);
    const numOfUnits = await getNumOfUnits(i, getNumOfUnits, numOfArmies);
    const strategy = await getStrategy(i, getStrategy, numOfArmies);

    armies = {
      ...armies,
      [i]: {
        name: `Army No.${i}`,
        numOfSquads,
        numOfUnits,
        strategy
      }
    };
    console.log("[main]", { armies });
  }
}

main();

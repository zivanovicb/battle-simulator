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
  let armies = {};

  for (let i = 1; i <= numOfArmies; i++) {
    const numOfSquads = await getNumOfSquads(i, getNumOfSquads, numOfArmies);
    const numOfUnits = await getNumOfUnits(i, getNumOfUnits, numOfArmies);
    const strategy = await getStrategy(i, getStrategy, numOfArmies);

    armies = {
      ...armies,
      [i]: new Army(createSquads(numOfSquads, numOfUnits), `Army No.${i}`, strategy)
    };

    console.log("armies", { armies });
  }
}

main();

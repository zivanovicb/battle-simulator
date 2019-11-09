const readline = require("readline-promise").default;
const { getNumOfArmies, getNumOfSquads, getNumOfUnits } = require("./helpers/battleInput");

const rlp = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

async function main() {
  const numOfArmies = await getNumOfArmies(getNumOfArmies);
  let armies = {};

  for (let i = 1; i <= numOfArmies; i++) {
    const numOfSquads = await getNumOfSquads(i, getNumOfSquads, numOfArmies);
    const numOfUnits = await getNumOfUnits(i, getNumOfUnits, numOfArmies);
    const strategy = await rlp.questionAsync(
      `Army ${i}/${numOfArmies} - Please choose strategy (1. Strongest / 2. Weakest / 3. Random): `
    );

    armies = {
      ...armies,
      [i]: {
        numOfSquads,
        numOfUnits,
        strategy
      }
    };

    console.log("[main]", { armies });
  }
}

main();

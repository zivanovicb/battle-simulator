const readline = require("readline-promise").default;

const rlp = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Gets input from stdin, does validation and gets called recursively if input is wrong
const getNumOfArmies = async (getNumOfArmies, numOfArmies) => {
  let finalNumOfArmies;
  if (numOfArmies === undefined) {
    // Gets user input from terminal
    finalNumOfArmies = await rlp.questionAsync(
      "Please enter number of armies on the battlefield (n >= 2): "
    );
    // numOfArmies will be defined in test cases
  } else finalNumOfArmies = numOfArmies;

  try {
    return parseNumOfArmies(finalNumOfArmies);
  } catch (err) {
    // Recursion
    console.error(`Error: ${err.message}. Please try again!`);
    return getNumOfArmies(getNumOfArmies);
  }
};

// Gets input from stdin, does validation and gets called recursively if input is wrong
const getNumOfSquads = async (i, getNumOfSquads, numOfArmies, numOfSquads) => {
  let finalNumOfSquads;

  if (numOfSquads === undefined) {
    // Gets user input from terminal
    finalNumOfSquads = await rlp.questionAsync(
      `Army ${i}/${numOfArmies} - Enter number of squads per army (n >= 2): `
    );
    // numOfSquads will be defined in test cases
  } else finalNumOfSquads = numOfSquads;

  finalNumOfSquads = parseInt(finalNumOfSquads, 10);
  try {
    return parseNumOfSquads(finalNumOfSquads);
  } catch (err) {
    console.log(`Error: ${err.message}. Please try again!`);
    // Recursion
    return getNumOfSquads(i, getNumOfSquads, numOfArmies);
  }
};

// Gets input from stdin, does validation and gets called recursively if input is wrong
const getNumOfUnits = async (i, getNumOfUnits, numOfArmies, numOfUnits) => {
  let finalNumOfUnits;

  if (numOfUnits === undefined) {
    // Gets user input from terminal
    finalNumOfUnits = await rlp.questionAsync(
      `Army ${i}/${numOfArmies} - Enter number of units per squad: (5 <= n <= 10): `
    );
    // finalNumOfUnits will be defined in test cases
  } else finalNumOfUnits = numOfUnits;

  finalNumOfUnits = parseInt(finalNumOfUnits, 10);

  try {
    return parseNumOfUnits(finalNumOfUnits);
  } catch (err) {
    console.log(`Error: ${err.message}. Please try again!`);
    // Recursion
    return getNumOfUnits(i, getNumOfUnits, numOfArmies);
  }
};

// Gets input from stdin, does validation and gets called recursively if input is wrong
const getStrategy = async (i, getStrategy, numOfArmies, strategyNumber) => {
  let finalStrategyNumber;

  if (strategyNumber === undefined) {
    // Gets user input from terminal
    finalStrategyNumber = await rlp.questionAsync(
      `Army ${i}/${numOfArmies} - Please choose strategy (1. Strongest / 2. Weakest / 3. Random): `
    );
    // finalStrategyNumber will be defined in test cases
  } else finalStrategyNumber = strategyNumber;

  finalStrategyNumber = parseInt(finalStrategyNumber, 10);

  try {
    return parseStrategyNum(finalStrategyNumber);
  } catch (err) {
    console.log(`Error: ${err.message}. Please try again!`);
    // Recursion
    return getStrategy(i, getStrategy, numOfArmies);
  }
};

const parseNumOfArmies = numOfArmies => {
  numOfArmies = parseInt(numOfArmies);

  if (isNaN(numOfArmies)) {
    throw new Error("You must enter the number");
  }
  if (numOfArmies < 2) {
    throw new Error("There must be at least two armies on the battlefield");
  }
  return numOfArmies;
};

const parseNumOfSquads = numOfSquads => {
  numOfSquads = parseInt(numOfSquads, 10);

  if (isNaN(numOfSquads)) {
    throw new Error("You must enter the number");
  }
  if (numOfSquads < 2) {
    throw new Error("There must be at least two armies on the battlefield");
  }
  return numOfSquads;
};

const parseNumOfUnits = numOfUnits => {
  numOfUnits = parseInt(numOfUnits, 10);

  if (isNaN(numOfUnits)) {
    throw new Error("You must enter the number");
  }

  if (numOfUnits < 5 || numOfUnits > 10) {
    throw new Error(`Wrong number(${numOfUnits}). (5 <= n <= 10)`);
  }

  return numOfUnits;
};

const parseStrategyNum = strategyNum => {
  strategyNum = parseInt(strategyNum, 10);

  if (isNaN(strategyNum)) {
    throw new Error("You must enter the number");
  }

  if (strategyNum !== 1 && strategyNum !== 2 && strategyNum !== 3) {
    throw new Error(
      `Wrong number(${strategyNum}). You can choose between 1 - strongest, 2 - weakest, 3 - random`
    );
  }

  return strategyNum;
};

module.exports = {
  parseNumOfArmies,
  parseNumOfSquads,
  parseNumOfUnits,
  parseStrategyNum,
  getNumOfArmies,
  getNumOfSquads,
  getNumOfUnits,
  getStrategy
};

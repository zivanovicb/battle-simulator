const {
  getNumOfArmies,
  getNumOfSquads,
  getNumOfUnits,
  getStrategy
} = require("./helpers/battleInput");
const Army = require("./models/Army");

async function main() {
  const numOfArmies = await getNumOfArmies(getNumOfArmies);
  try {
    const armies = await initArmies(numOfArmies);

    // A fighting promise resolves once all squads get destroyed or there are no enemy squads left
    const armyFightingPromises = [];
    armies.forEach(a => armyFightingPromises.push(a.joinBattle(armies)));

    console.log("========> SIMULATION STARTS NOW <========");
    await Promise.all(armyFightingPromises);
    console.log("========> SIMULATION IS OVER <========");

    const winner = armies
      .reduce((acc, a) => {
        const activeSquadsLength = a.squads.filter(sq => sq.isActive()).length;
        return [...acc, { ...a, hasActiveSquads: activeSquadsLength > 0, activeSquadsLength }];
      }, [])
      .filter(a => a.hasActiveSquads)[0];

    console.log(
      `========> THE WINNER IS ${winner.name} with ${winner.activeSquadsLength} active squads left <========`
    );
    process.exit();
  } catch (err) {
    console.log("[main.err]", err.message);
  }
}

const initArmies = async numOfArmies => {
  const armies = [];
  await [...Array(numOfArmies)].reduce(
    (p, _, i) =>
      p.then(async _ => {
        const army = await initArmy(i, numOfArmies);
        armies.push(army);
      }),
    Promise.resolve()
  );
  return armies;
};

const initArmy = async (i, numOfArmies) => {
  try {
    const numOfSquads = await getNumOfSquads(i, getNumOfSquads, numOfArmies);
    const numOfUnits = await getNumOfUnits(i, getNumOfUnits, numOfArmies);
    const strategyNum = await getStrategy(i, getStrategy, numOfArmies);
    const a = new Army(i, numOfSquads, numOfUnits, `Army No.${i}`, strategyNum);
    return { i, ...a };
  } catch (err) {
    console.error("[initArmy]", err.message);
    return err.message;
  }
};

main();

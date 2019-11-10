const Squad = require("./squad");

class Army {
  constructor(squads, name, strategyNum) {
    if (!Array.isArray(squads)) {
      throw new Error("Squads parameter should be an array of Squad objects");
    }

    if (squads.filter(u => !(u instanceof Squad)).length > 0) {
      throw new Error("Squads parameter should be an array of Squad objects");
    }

    if (squads.length < 2) {
      console.log("AM I THROWINGNGNNGNG???");
      throw new Error("Wrong number. There should be at least two squads in army");
    }

    // List of squad objects
    this.squads = squads;
    this.name = name;
    this.strategy = strategyNum;
  }

  getStrategy(strategyNum) {
    switch (strategyNum) {
      case 1:
        return "strongest";
      case 2:
        return "weakest";
      case 3:
        return "random";
      default:
        return "strongest";
    }
  }
}

module.exports = Army;

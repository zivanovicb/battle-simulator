const parseStrategy = strategyNum => {
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
};

module.exports = {
  parseStrategy
};

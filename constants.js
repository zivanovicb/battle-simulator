const ERR_NUM_OF_SQUADS =
  "Wrong numOfSquads parameter. There should be at least two squads in army";
const ERR_NUM_OF_UNITS = "Wrong numOfUnits parameter (5 <= n <= 10)";
const ERR_NUM_OF_OPERATORS_PER_VEHICLE = "There must be at least 1 operator per vehicle";
const ERR_STRATEGY_NUM = "Wrong strategyNum parameter. It can be 1, 2 or 3";
const ERR_EXPERIENCE_AMOUNT = "Experience should be a number between 0 and 50";
const ERR_HEALTH_AMOUNT = "Health should be a number between 0 and 100";
const ERR_UNIT_RECHARGE_AMOUNT = "Recharge should be a number between 100 and 2000";
const ERR_VEHICLE_RECHARGE_AMOUNT = "Recharge property must be a number between 1000 and 2000";

module.exports = {
  ERR_NUM_OF_SQUADS,
  ERR_NUM_OF_UNITS,
  ERR_STRATEGY_NUM,
  ERR_EXPERIENCE_AMOUNT,
  ERR_HEALTH_AMOUNT,
  ERR_UNIT_RECHARGE_AMOUNT,
  ERR_VEHICLE_RECHARGE_AMOUNT,
  ERR_NUM_OF_OPERATORS_PER_VEHICLE
};

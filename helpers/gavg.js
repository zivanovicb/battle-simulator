// Computes a geometric mean for array of numbers
const gavg = arrOfNumbers => {
  if (!Array.isArray(arrOfNumbers) || arrOfNumbers.filter(n => isNaN(n)).length > 0) {
    throw new Error("Argument is supposed to be an array of numbers");
  }

  const a = arrOfNumbers.reduce((acc, i) => acc * i, 1);
  return Math.pow(a, 1 / arrOfNumbers.length);
};

module.exports = gavg;

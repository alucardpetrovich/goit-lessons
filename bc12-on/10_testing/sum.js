exports.sum = (...args) => {
  return args.reduce((sum, currValue) => round(sum + currValue, 5), 0);
};

function round(value, mantissaPoint) {
  const discharge = Math.pow(10, mantissaPoint);

  return Math.round(value * discharge) / discharge;
}

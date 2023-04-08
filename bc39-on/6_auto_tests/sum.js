exports.sum = (...nums) => {
  const result = nums.reduce((acc, val) => acc + val);
  return +result.toFixed(5);
};

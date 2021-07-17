exports.sum = (...nums) => {
  const result = nums.reduce((acc, num) => {
    if (isNaN(num)) {
      throw new Error(`'${num}' is not a number`);
    }
    return acc + parseFloat(num);
  });

  return Math.round(result * 100) / 100;
};

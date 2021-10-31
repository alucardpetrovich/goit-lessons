exports.sum = (...nums) => {
  return nums.reduce((sum, num) => {
    if (typeof num !== "number" || isNaN(num)) {
      throw new Error(`'${num}' is not a number'`);
    }

    return sum + num;
  });
};

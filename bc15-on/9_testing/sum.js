exports.sum = (...nums) => {
  return nums.reduce(
    (result, num) => Math.round((result + num) * 10000) / 10000
  );
};

exports.deduct = (...nums) => {
  return nums.reduce(
    (result, num) => Math.round((result - num) * 10000) / 10000
  );
};

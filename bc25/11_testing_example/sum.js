const _ = require("lodash");

exports.sum = (...numbers) => {
  if (numbers.some((num) => typeof num !== "number")) {
    throw new Error(`Received not a number`);
  }

  const result = numbers.reduce((acc, num) => acc + num, 0);

  return _.round(result, 2);
};

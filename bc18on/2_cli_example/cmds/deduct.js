exports.command = "deduct";

exports.description = "deduct second number from first one";

exports.handler = (argv) => {
  console.log("Deduction result is:", argv.num1 - argv.num2);
};

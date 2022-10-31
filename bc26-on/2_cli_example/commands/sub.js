exports.command = "sub";

exports.desc = "Subtracts second number from first";

exports.handler = (argv) => {
  console.log("Subtraction result is =", argv.num1 - argv.num2);
};

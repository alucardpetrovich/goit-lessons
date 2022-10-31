exports.command = "sum";

exports.desc = "Sums two numbers";

exports.handler = (argv) => {
  console.log("Sum of two numbers =", argv.num1 + argv.num2);
};

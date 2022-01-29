exports.command = "div";

exports.desc = "Divide two numbers";

exports.handler = (argv) =>
  console.log("The div result is =", argv.num1 / argv.num2);

exports.command = "add";

exports.desc = "Adds two numbers";

exports.handler = (argv) => console.log("The sum is =", argv.num1 + argv.num2);

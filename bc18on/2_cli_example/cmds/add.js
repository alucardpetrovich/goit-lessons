exports.command = "add";

exports.description = "adds two numbers";

exports.handler = (argv) => {
  console.log(
    "The sum is:",
    // argv.nums.reduce((acc, num) => acc + num)
    argv.num1 + argv.num2
  );
};

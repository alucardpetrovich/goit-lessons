// #!/usr/bin/env node
const { program } = require("commander");

program
  .command("add")
  .option("--num1 <num1>", "first number", 0)
  .option("--num2 <num2>", "second number", 0)
  .action((options) => {
    const { num1, num2 } = options;
    const sum = parseFloat(num1) + parseFloat(num2);
    console.log("The sum =", sum);
  });

program
  .command("div")
  .option("--num1 <num1>", "first number", 0)
  .option("--num2 <num2>", "second number", 0)
  .action((options) => {
    const { num1, num2 } = options;
    const sum = parseFloat(num1) / parseFloat(num2);
    console.log("The div =", sum);
  });

program.parse();

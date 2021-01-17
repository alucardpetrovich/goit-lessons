import { program } from "commander";

program.version("0.0.1");

program
  .command("sum <num1> <num2>")
  .description("Sums two numbers")
  .action((num1, num2) => {
    console.log(`Sum ${num1} and ${num2} = ${parseInt(num1) + parseInt(num2)}`);
  });

program
  .command("diff <num1> <num2>")
  .description("Diff of two numbers")
  .action((num1, num2) => {
    console.log(
      `Diff ${num1} and ${num2} = ${parseInt(num1) - parseInt(num2)}`
    );
  });

program.parse();

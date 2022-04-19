#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(
    "sum",
    "adds two numbers",
    (yargs) => yargs,
    (argv) => {
      if (!argv.num1 && !argv.num2) {
        console.error("no num1 or num2");
        process.exit(1);
      }

      console.log("The sum is:", argv.num1 + argv.num2);
    }
  )
  .command(
    "deduct",
    "deduct two numbers",
    (yargs) => yargs,
    (argv) => {
      if (!argv.num1 && !argv.num2) {
        console.error("no num1 or num2");
        process.exit(1);
      }

      console.log("The deduction result is:", argv.num1 - argv.num2);
    }
  )
  .option("num1", {
    alias: "n1",
    type: "number",
    description: "First number in math equasion",
  })
  .option("num2", {
    alias: "n2",
    type: "number",
    description: "Second number in math equasion",
  })
  .parse();

#!/usr/bin/env node
require("yargs") // eslint-disable-line
  .command(
    "add [num1] [num2]",
    "adds two numbers",
    (yargs) => {
      yargs
        .positional("num1", {
          describe: "first number",
          type: "number",
        })
        .positional("num2", {
          describe: "second number",
          type: "number",
        });
    },
    (argv) => {
      const sum = argv.num1 + argv.num2;

      console.log("sum :>> ", sum);
    }
  )
  .command(
    "deduct [num1] [num2]",
    "deducts two numbers",
    (yargs) => {
      yargs
        .positional("num1", {
          describe: "first number",
          type: "number",
        })
        .positional("num2", {
          describe: "second number",
          type: "number",
        });
    },
    (argv) => {
      const difference = argv.num1 - argv.num2;

      console.log("difference :>> ", difference);
    }
  ).argv;

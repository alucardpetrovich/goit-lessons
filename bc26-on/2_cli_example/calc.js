#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// yargs(hideBin(process.argv))
//   .command(
//     "sum",
//     "Sums two numbers",
//     (yargs) => yargs,
//     (argv) => {
//       console.log("Sum of two numbers =", argv.num1 + argv.num2);
//     }
//   )
//   .command(
//     "sub",
//     "Subtracts second number from first",
//     (yargs) => yargs,
//     (argv) => {
//       console.log("Subtraction result is =", argv.num1 - argv.num2);
//     }
//   )
//   .option("num1", {
//     alias: "n1",
//     number: true,
//     description: "first number",
//     demandOption: true,
//   })
//   .option("num2", {
//     alias: "n2",
//     number: true,
//     description: "second number",
//     demandOption: true,
//   })
//   .parse();

yargs(hideBin(process.argv))
  .commandDir("commands")
  .demandCommand()
  .option("num1", {
    alias: "n1",
    number: true,
    description: "first number",
    demandOption: true,
  })
  .option("num2", {
    alias: "n2",
    number: true,
    description: "second number",
    demandOption: true,
  })
  .parse();

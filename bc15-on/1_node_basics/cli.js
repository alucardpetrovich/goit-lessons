#!/usr/bin/env node
// const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");
// const argv = yargs(hideBin(process.argv)).argv;

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log("Plunder more riffiwobbles!");
// } else {
//   console.log("Retreat from the xupptumblers!");
// }

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(
    "add [num1] [num2]",
    "Adds two numbers",
    (yargs) => {
      return yargs
        .positional("num1", {
          describe: "First number",
          type: "number",
        })
        .positional("num2", {
          describe: "Second number",
          type: "number",
        });
    },
    (argv) => {
      console.log("The sum is:", argv.num1 + argv.num2);
    }
  )
  .command(
    "diff [num1] [num2]",
    "Deduct first number from second",
    (yargs) => {
      return yargs
        .positional("num1", {
          describe: "First number",
          type: "number",
        })
        .positional("num2", {
          describe: "Second number",
          type: "number",
        });
    },
    (argv) => {
      console.log("The diff is:", argv.num1 - argv.num2);
    }
  )
  .parse();

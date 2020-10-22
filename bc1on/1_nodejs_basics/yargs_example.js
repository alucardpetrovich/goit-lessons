#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
// const argv = yargs.argv;

// console.log(argv);

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log("Plunder more riffiwobbles!");
// } else {
//   console.log("Retreat from the xupptumblers!");
// }

yargs(hideBin(process.argv)).command(
  "add [num1] [num2]",
  "Adds two numbers",
  (yargs) => {
    yargs
      .positional("num1", {
        describe: "num1 to add",
        default: 5,
      })
      .positional("num2", {
        describe: "num2 to add",
        default: 8,
      });
  },
  (argv) => {
    console.log(argv.num1 + argv.num2);
  }
).argv;

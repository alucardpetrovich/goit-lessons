#!/usr/bin/env node
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(
    "sum",
    "sum two integers",
    (yargs) => {
      return yargs.default("num1", 5);
    },
    (argv) => {
      console.log("The sum is:", argv.num1 + argv.num2);
    }
  )
  .command(
    "deduct",
    "deduct two integers",
    (yargs) => {
      return yargs.default("num1", 5);
    },
    (argv) => {
      console.log("The sum is:", argv.num1 - argv.num2);
    }
  ).argv;

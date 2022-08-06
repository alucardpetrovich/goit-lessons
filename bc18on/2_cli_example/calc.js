#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .commandDir("cmds")
  // .command(
  //   "add",
  //   "adds two numbers",
  //   (yargs) => yargs,
  //   (argv) => {
  //     console.log("The sum is:", argv.num1 + argv.num2);
  //   }
  // )
  // .command(
  //   "deduct",
  //   "deduct second number from first one",
  //   (yargs) => yargs,
  //   (argv) => {
  //     console.log("Deduction result is:", argv.num1 - argv.num2);
  //   }
  // )
  .option("num1", {
    alias: "n1",
    type: "number",
    description: "First number",
    demandOption: true,
  })
  .option("num2", {
    alias: "n2",
    type: "number",
    description: "Second number",
    demandOption: true,
  })
  // .option("nums", {
  //   type: "number",
  //   array: true,
  //   desc: "numbers array",
  // })
  .parse();

#!/usr/bin/env node

require("yargs") // eslint-disable-line
  .command(
    "sum [num1] [num2]",
    "add two numbers",
    (yargs) => {
      yargs
        .positional("num1", {
          type: Number,
        })
        .positional("num2", {
          type: Number,
        });
    },
    (argv) => {
      console.log('The sum is', argv.num1 + argv.num2);
    }
  ).argv;

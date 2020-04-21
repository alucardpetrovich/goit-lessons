#!/usr/bin/env node
// #!/usr/bin/env node
// const argv = require("yargs").number("ships").number("distance").argv;

// console.log(argv);

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log("Plunder more riffiwobbles!");
// } else {
//   console.log("Retreat from the xupptumblers!");
// }

// const argv = require("yargs").argv;

// console.log(argv);

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log("Plunder more riffiwobbles!");
// } else {
//   console.log("Retreat from the xupptumblers!");
// }

require("yargs")
  .number("num1")
  .number("num2")
  .command(
    "add [num1] [num2]",
    "adds two digits",
    (yargs) => {
      yargs
        .positional("num1", {
          type: "number",
          describe: "number 1",
        })
        .positional("num2", {
          type: "number",
          describe: "number 2",
        });
    },
    ({ num1, num2 }) => {
      console.log(num1 + num2);
    }
  )
  .command(
    "sub",
    "sub two digits",
    (yargs) => {},
    ({ num1, num2 }) => {
      console.log(num1 - num2);
    }
  ).argv;

// console.log("argv", argv);

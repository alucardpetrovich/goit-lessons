const yargsPackage = require("yargs");

// console.log(argv);

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log("Plunder more riffiwobbles!");
// } else {
//   console.log("Retreat from the xupptumblers!");
// }

yargsPackage.command(
  "add [num1] [num2]",
  "adds two numbers",
  (yargs) => {
    yargs.positional("num1", { default: 0 }).positional("num2", { default: 0 });
  },
  (argv) => {
    console.log(argv.num1 + argv.num2);
  }
).argv;

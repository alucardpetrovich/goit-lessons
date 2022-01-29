const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv)).commandDir("commands").demandCommand().help().argv;

// yargs(hideBin(process.argv))
//   .command(
//     "add",
//     "Adds two numbers",
//     (yargs) => yargs,
//     (argv) => {
//       console.log("The sum is =", argv.num1 + argv.num2);
//     }
//   )
//   .command(
//     "div",
//     "Divide two numbers",
//     (yargs) => yargs,
//     (argv) => {
//       console.log("The div result is =", argv.num1 / argv.num2);
//     }
//   )
//   .option("num1", { alias: "n1", type: "number", description: "first number" })
//   .option("num2", { alias: "n2", type: "number", description: "second number" })
//   .parse();

#!/usr/bin/env node
const argv = require("yargs").argv;

const { num1, num2 } = argv;

// if (argv.ships > 3 && argv.distance < 53.5) {
//   console.log("Plunder more riffiwobbles!");
// } else {
//   console.log("Retreat from the xupptumblers!");
// }
console.log(num1 + num2);

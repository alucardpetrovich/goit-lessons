const child = require("./child");

console.log("global.c", global.c);

global.c = "cxzvzxcv";

console.log(child);

// process.exit(124213);

console.log(process.env);
console.log(process.argv);

global.b = "test";

// process.exit(0);

const child = require("./child");

// console.log(child);

// console.log("__filename", __filename);
// console.log("__dirname", __dirname);

console.log("process.cwd()", process.cwd());
console.log("process.argv", process.argv);
console.log("process.env", process.env);



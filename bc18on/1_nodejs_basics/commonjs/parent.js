const test = require("./child");
// import * as test from './child';

// console.log(test);

// process.exit(0);

console.log("__dirname", __dirname);
console.log("__filename", __filename);
console.log("cwd", process.cwd());
console.log("process.argv", process.argv);
console.log("process.pid", process.pid);
console.log("process.env", process.env);

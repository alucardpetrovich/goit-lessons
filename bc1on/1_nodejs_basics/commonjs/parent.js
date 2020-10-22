const { a } = require("./child");

global.gl1 = "glob1";

console.log("global", global.gl);

console.log(require.main === module);

console.log("__dirname", __dirname);
console.log("__filename", __filename);

// console.log(a);

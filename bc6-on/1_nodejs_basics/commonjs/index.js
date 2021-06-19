const { a } = require("./import");

// console.log(require.main === module);

global.c = 5;
// console.log(process.env);
// console.log(process.argv);

console.log("__dirname", __dirname);
console.log("__filename", __filename);

// console.log(a);
// console.log(global.gl);

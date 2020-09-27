const dependency = require("./dependency");

console.log("is main", require.main === module);

console.log(dependency);

// console.log("main", require.main);

console.log("__dirname", __dirname);
console.log("__filename", __filename);

// process.exit(0);

console.log("cwd", process.cwd());
console.log("argv", process.argv);
console.log("env", process.env);

// DON'T DO THAT
// process.env = 'hello'

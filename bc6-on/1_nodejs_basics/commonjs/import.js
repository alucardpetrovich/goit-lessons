module.exports = {
  a: 1,
};

console.log("process.cwd()", process.cwd());
// process.exit(0);

console.log(require.main === module);

global.gl = 3;

console.log(global.c);

// exports.a = 1;

// ? DO NOT DO THIS
// exports = {
//   a: 1,
// };

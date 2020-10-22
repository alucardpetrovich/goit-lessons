const a = 1 + 2;

module.exports = {
  a,
};
exports.a = a;
// exports = {
//   a,
// };

// console.log("module", module);
// console.log(require.main === module);

global.gl = "global";

console.log("global.gl1", global.gl1);

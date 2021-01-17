const b = 11;

global.c = "asdf";

console.log("require.main", require.main);
console.log("__filename", __filename);

module.exports = {
  a: 10,
};

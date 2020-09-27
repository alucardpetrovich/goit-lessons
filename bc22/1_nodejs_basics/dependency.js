const a = 5;

// 1. first example

// module.exports = a;
// export default a;

// 2. second example
// module.exports.b = 6;
// exports.a = a;

// 3. third example
// DON'T DO THAT
// exports = 5;

console.log("is main", require.main === module);

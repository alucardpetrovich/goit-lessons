// const a = 5;

// module.exports.a = a;
// exports.a = a;

const b = { a: 1 };
const a = b;

a.c = 8;

global.asd = 5;

// module.exports = a;
module.exports = { a, b };

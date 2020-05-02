const a = 1;

function hello() {
  return "world";
}

global.a = 2;

export const one = 1;

// module.exports = {
//   a,
//   hello,
// };

// exports.a = a;
// exports.hello = hello;

/// Won't work
// exports = {
//   a,
//   hello,
// };

// console.log(__filename);
// require("./export");
// require("./export/export");
// console.log("index dirname", __dirname);
// console.log("index cwd", process.cwd());

// console.log(require('./export/export'));

const origin = { a: 1 };
let copy = origin;

copy = { a: 2 };

global.copy = copy;

require("./export/export");

// console.log(module);
// require("react");

// module.exports
// export default

// exports.prop
// export const prop
// export function prop

// module.exports = { a: 1 };

// import { ReactDOM } from 'react'
// const { ReactDOM } = require('react')

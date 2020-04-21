require = require("esm")(module);
const mongoose = require("mongoose");
// import esm from 'esm'
// require = esm(module)

// console.log("args", process.env);
console.log("args", process.argv);
// process.exit(-1);

console.log("before", global.glob);

const export_test = require("./export");
// import export from './export';

console.log(global.glob);

console.log(export_test);

async function main() {
  await mongoose.connect(
    "mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/mongodb_example?retryWrites=true"
  );
  console.log("DB connected");
  // process.exit(0);
}

main();

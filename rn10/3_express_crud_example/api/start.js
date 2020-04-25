require = require("esm")(module);
const { CrudServer } = require("./server");

new CrudServer().start();

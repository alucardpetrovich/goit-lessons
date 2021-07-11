const bcryptjs = require("bcryptjs");

const hash = bcryptjs.hashSync("qwertydsfdsf", 10);
console.log(hash);
console.log(bcryptjs.compareSync("qwertydsfds", hash));

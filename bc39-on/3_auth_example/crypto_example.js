const crypto = require("crypto");

const password = "qwerty";
const salt = "vadsfasdfasd";

const hash = crypto.createHash("sha256").update(password + salt).digest("hex");

console.log(salt + "." + hash);

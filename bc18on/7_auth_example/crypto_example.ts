import * as crypto from "crypto";

const salt = crypto.randomBytes(12).toString("hex");

const passwordHash = crypto
  .createHash("sha256")
  .update("qwerty" + salt, "utf8")
  .digest("hex");

console.log(passwordHash);

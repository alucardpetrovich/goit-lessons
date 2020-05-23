const path = require("path");
const variableExpansion = require("dotenv-expand");
const myEnv = require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
variableExpansion(myEnv);

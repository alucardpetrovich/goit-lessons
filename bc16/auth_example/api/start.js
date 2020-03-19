require = require("esm")(module);
const { QuestionsServer } = require("./server");
const { config } = require("./config");

new QuestionsServer(config).start();

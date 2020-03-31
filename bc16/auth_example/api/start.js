// 1. heroku create
// 2. npm start script
// 3. get PORT from process.env.PORT
// 4. deploy to heroku `git push heroku master`

require = require("esm")(module);
const { QuestionsServer } = require("./server");
const { config } = require("./config");

console.log("process.env", process.env);

new QuestionsServer(config).start();

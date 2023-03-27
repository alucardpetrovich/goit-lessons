const { createClient } = require("redis");
const { getConfig } = require("../config");

let client;

exports.connectToRedis = async function () {
  const { redis } = getConfig();
  client = createClient(redis);

  await client.connect();
};

exports.getClient = () => {
  return client;
};

const express = require("express");
const { Client } = require("pg");

const client = new Client(
  "postgresql://bc15_on:qwerty@bc15_on_example:5432/bc15_on"
);
let isConnected = false;

const app = express();

app.get("/", async (req, res) => {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }

  console.log(await client.query("SELECT 1 + 1"));
  console.log("request received");
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

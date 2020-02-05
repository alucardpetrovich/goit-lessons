const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello router");
});

router.post("/", (req, res) => {
  res.send("post router");
});

module.exports = router;

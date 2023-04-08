const express = require("express");

const app = express();

app.use("/static", express.static("static"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});

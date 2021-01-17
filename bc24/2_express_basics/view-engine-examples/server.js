import express from "express";

const PORT = 3000;

const server = express();
// join(__dirname, 'views')
server.set("views", "./views");
server.set("view engine", "ejs");

server.get("/", (req, res) => {
  res.render("home", { id: Math.round(Math.random() * 10) });
});

server.listen(PORT, () => {
  console.log("Started listening on port", PORT);
});

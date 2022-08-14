import * as express from "express";

interface RequestBody {
  username: string;
  email: string;
}

const server = express();

server.use(express.json());

server.post(
  "/user",
  (req: express.Request<any, any, RequestBody>, res, next) => {
    req.body.username;
  }
);

server.listen(3000, () => {
  console.log("server started");
});

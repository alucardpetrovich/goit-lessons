const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { errorWrapper } = require("../helpers/error-wrapper");
const { serializeUsers } = require("./users.serializer");

const router = Router();

router.get(
  "/current",
  authorize,
  errorWrapper(async (req, res, next) => {
    res.status(200).send(serializeUsers(req.user));
  })
);

exports.usersController = router;

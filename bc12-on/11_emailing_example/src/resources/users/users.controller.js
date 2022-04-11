const { Router } = require("express");
const { authorize } = require("../../middlewares/authorize.middleware");
const { catchErrors } = require("../../middlewares/catch-errors");
const { serializeUserResponse } = require("./users.serializers");
const { usersService } = require("./users.service");

const usersRouter = Router();

usersRouter.get(
  "/current",
  authorize(),
  catchErrors(async (req, res) => {
    const user = await usersService.getCurrentUser(req.userId);
    res.status(200).send(serializeUserResponse(user));
  })
);

exports.usersRouter = usersRouter;

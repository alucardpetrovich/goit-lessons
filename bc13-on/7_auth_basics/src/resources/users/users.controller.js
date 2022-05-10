const { Router } = require("express");
const { authorize } = require("../../shared/middlewares/authorize");
const { catchErrors } = require("../../shared/middlewares/catch-errors");
const { serializeCurrentUser } = require("./users.serializers");
const { usersService } = require("./users.service");

const router = Router();

router.get(
  "/current",
  authorize,
  catchErrors(async (req, res, next) => {
    const user = await usersService.getCurrentUser(req.userId);
    res.status(200).send(serializeCurrentUser(user));
  })
);

exports.usersRouter = router;

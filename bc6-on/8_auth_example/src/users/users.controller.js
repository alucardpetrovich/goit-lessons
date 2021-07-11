const { Router } = require("express");
const { prepareUser } = require("../users/user.serializer");
const { authorize } = require("../auth/authorize.middleware");

const router = Router();

router.get("/me", authorize, (req, res, next) => {
  res.status(200).send(prepareUser(req.user));
});

exports.usersController = router;

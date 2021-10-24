const { Router } = require("express");
const { authorize } = require("../auth/auth.middleware");
const { serializeUser } = require("./user.serializer");

const router = Router();

router.get("/current", authorize(), (req, res, next) => {
  try {
    res.status(200).send(serializeUser(req.user));
  } catch (err) {
    next(err);
  }
});

exports.usersController = router;

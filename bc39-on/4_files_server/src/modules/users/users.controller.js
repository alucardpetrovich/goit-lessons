const { Router } = require("express");
const { upload } = require("../../shared/middlewares/multer");
const { asyncWrapper } = require("../../shared/middlewares/async-wrapper");
const { authorize } = require("../../shared/middlewares/authorize");
const { usersService } = require("./users.service");
const { serializeUserResponse } = require("./users.serializers");

const router = Router();

router.post(
  "/avatar",
  authorize(),
  upload.single("avatar"),
  asyncWrapper(async (req, res, next) => {
    const user = await usersService.uploadAvatar(req.userId, req.file.path);
    res.status(201).send(serializeUserResponse(user));
  })
);

exports.usersController = router;

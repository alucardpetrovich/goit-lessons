import { Router } from "express";
import { asyncWrapper } from "../helpers/async-wrapper.js";
import { authorize } from "../helpers/authorize.js";
import { composeUsers } from "./users.serializer.js";
import { usersService } from "./users.service.js";

const router = Router();

router.get(
  "/current",
  authorize,
  asyncWrapper(async (req, res) => {
    const user = await usersService.getUser(req.userId);
    res.send(composeUsers(user));
  })
);

export const usersController = router;

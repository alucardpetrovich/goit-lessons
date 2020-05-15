import Joi from "@hapi/joi";
import { userModel } from "./user.model";
import jwt from "jsonwebtoken";

class UserController {
  async signUp(req, res, next) {
    // 1. get user avatar +
    // 2. minify avatar +
    // 3. validation +
    // 4. create avatar link +
    // 5. save user +
    // 6. create token for user +
    // 6. send successfull response +

    const avatarUrl = `${process.env.SERVER_URL}/${process.env.COMPRESSED_IMAGES_BASE_URL}/${req.file.filename}`;

    const user = await userModel.create({
      ...req.body,
      avatarUrl,
    });

    const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET);

    res.cookie("auth_token", token, { httpOnly: true });

    return res.status(201).send();
  }

  async getUserProfile(req, res, next) {
    const { auth_token } = req.cookies;
    if (!auth_token) {
      return res.status(401).send("user not authorized");
    }

    const { uid } = jwt.verify(auth_token, process.env.JWT_SECRET);
    const user = await userModel.findById(uid);
    if (!user) {
      return res.status(404).send("user not found");
    }

    return res.render("profile", {
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
  }

  validateSignUp(req, res, next) {
    console.log("hello");
    const userRules = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const hasAvatarFile = req.file && req.file.fieldname === "avatar";
    if (!hasAvatarFile) {
      return res.status(400).json({ message: "Avatar file was not provided" });
    }

    const validationResult = userRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    }

    next();
  }
}

export const userController = new UserController();

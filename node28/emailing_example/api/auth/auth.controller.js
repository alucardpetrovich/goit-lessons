const Joi = require("@hapi/joi");
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const { User } = require("../users/user.model");

const SALT_ROUNDS = 6;
const BASE_URL = "http://localhost:3000";

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

exports.signUp = async (req, res, next) => {
  try {
    // 1. validate req body +
    // 2. get user with passed email +
    // 3. if exists - throw 409 error +
    // 4. hash password +
    // 5. save user to db +
    // 6. generate invite link +
    // 7. send email with invite link +
    // 8. send successfull response +

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User with such email already exists");
    }

    const passwordHash = await bcryptjs.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      email,
      passwordHash,
      verificationToken: uuid.v4(),
    });

    const verificationLink = generateVerificationLink(
      newUser.verificationToken
    );
    await sendVerificationEmail(email, verificationLink);

    return res.status(201).send({
      id: newUser._id,
      email: newUser.email,
    });
  } catch (err) {
    next(err);
  }
};

exports.verifyUserEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.query;

    const user = await User.findOne({ verificationToken });
    if (!user) {
      return res
        .status(404)
        .send("User with such verification token not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
    });

    return res.status(200).send("User successfully verified");
  } catch (err) {
    next(err);
  }
};

exports.validateSignUp = (req, res, next) => {
  const signUpSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = signUpSchema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error);
  }

  next();
};

function generateVerificationLink(verificationToken) {
  return `${BASE_URL}/api/auth/verify?verificationToken=${verificationToken}`;
}

async function sendVerificationEmail(email, verificationLink) {
  return mailTransporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `Please verify email for ${BASE_URL} site`,
    html: `<a href="${verificationLink}">verify email</a>`,
  });
}

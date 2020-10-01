const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");
const nodemailer = require("nodemailer");
const { UserModel } = require("../users/user.model");
const { SessionModel } = require("../sessions/session.model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

exports.signUp = async (req, res, next) => {
  // 1. validate req body +
  // 2. check if client provided unique email (throw 409 if not unique) +
  // 3. hash password +
  // 4. save user to DB +
  // 5. send successfull response

  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send(`User with email ${email} already exists`);
    }

    const passwordHash = await bcryptjs.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );

    const newUser = await UserModel.create({
      username,
      email,
      passwordHash,
      verificationToken: uuid.v4(),
    });
    await sendVerificationEmail(email, newUser.verificationToken);

    res.status(201).send({
      id: newUser._id,
      username,
      email,
    });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  // 1. validate req body +
  // 2. check if user with email exists (throw 404 if not) +
  // 3. check password (throw 403 if password does not match) +
  // 4. generate token +
  // 5. send successful response
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.passwordHash);
  if (!isPasswordCorrect) {
    return res.status(403).send("Password is wrong");
  }

  if (!user.isVerified) {
    return res.status(403).send("Your email is not verified");
  }

  const newSession = await SessionModel.create({ userId: user._id });

  const token = jwt.sign(
    { sid: newSession._id, uid: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.cookie("token", token, { httpOnly: true });

  res.status(201).send({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

exports.signOut = async (req, res, next) => {
  try {
    await SessionModel.deleteOne({ _id: req.session._id });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.authorize = async (req, res, next) => {
  // 1. get token +
  // 2. verify token +
  // 3. get user by token +
  // 4. write user to req object +
  // 5. pass req execution to next middleware +
  const { token } = req.cookies;

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }

  const session = await SessionModel.findById(payload.sid);
  if (!session) {
    return res.status(401).send("Session not found");
  }

  const user = await UserModel.findById(payload.uid);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.user = user;
  req.session = session;

  next();
};

exports.verifyEmail = async (req, res, next) => {
  // 1. get verificationToken
  // 2. get user by verification token
  // 3. if user not found - 404
  // 4. if user exists - verify user and return successful response
  try {
    const { verificationToken } = req.params;

    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
      return res.status(404).send("User not found");
    }

    await UserModel.updateOne({ verificationToken }, { isVerified: true });

    return res.status(200).send("User successfully verified");
  } catch (err) {
    next(err);
  }
};

async function sendVerificationEmail(email, verificationToken) {
  const verificationLink = `http://localhost:3000/auth/verify/${verificationToken}`;

  return transporter.sendMail({
    to: email,
    from: process.env.NODEMAILER_EMAIL,
    subject: "Please verify your account",
    html: `<a href="${verificationLink}">Verification link</a>`,
  });
}

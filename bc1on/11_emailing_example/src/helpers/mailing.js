const nodemailer = require("nodemailer");

class Mailing {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });
  }

  async sendVerificationEmail(user) {
    const verificationLink = `${process.env.SERVER_DOMAIN}/auth/verify/${user.verificationToken}`;

    return this.transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: user.email,
      subject: "Email verification",
      html: `<p>
        Hello ${user.username}! Please verify your email by following next link.
        <a href=${verificationLink}>verification link</a>
      </p>`,
    });
  }
}

exports.mailing = new Mailing();

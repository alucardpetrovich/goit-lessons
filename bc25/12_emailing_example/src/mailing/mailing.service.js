const nodemailer = require("nodemailer");

class MailingService {
  constructor() {}

  async sendVerificationEmail(email, verificationToken) {
    const transport = this.getTransport();
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify?verificationToken=${verificationToken}`;

    return transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Email verification",
      html: `Please follow link for verification <a href="${verificationLink}">link</a>`,
    });
  }

  getTransport() {
    if (this.transport) {
      return this.transport;
    }

    this.transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    return this.transport;
  }
}

exports.mailingService = new MailingService();

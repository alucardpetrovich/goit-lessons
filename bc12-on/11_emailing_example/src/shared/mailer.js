const nodemailer = require("nodemailer");
const { getConfig } = require("../config");

class MailingClient {
  async sendVerificationEmail(to, verificationUrl) {
    return this.sendMail(
      to,
      "Verification needed",
      `<a href=${verificationUrl}>verify email</a>`
    );
  }

  async sendMail(to, subject, body) {
    this.setupClient();
    return this.transport.sendMail({
      to,
      from: getConfig().mailer.user,
      subject,
      html: body,
    });
  }

  setupClient() {
    if (this.transport) {
      return;
    }

    this.transport = nodemailer.createTransport({
      service: "gmail",
      auth: getConfig().mailer,
    });
  }
}

exports.mailingClient = new MailingClient();

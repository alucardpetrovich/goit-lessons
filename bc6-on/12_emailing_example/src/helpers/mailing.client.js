const sgMail = require("@sendgrid/mail");

class MailingClient {
  async sendVerificationEmail(email, verificationToken) {
    this.setKey();

    const verificationLink = `${process.env.API_BASE_URL}/auth/verify/${verificationToken}`;

    return sgMail.send({
      from: process.env.SENDGRID_SENDER,
      to: email,
      subject: "Email verification needed",
      html: `<a href="${verificationLink}">verify email</a>`,
    });
  }

  setKey() {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
  }
}

module.exports.mailingClient = new MailingClient();

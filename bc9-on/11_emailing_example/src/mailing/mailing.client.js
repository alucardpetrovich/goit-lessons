const sgMail = require("@sendgrid/mail");
const path = require("path");
const { getConfig } = require("../config");

class MailingClient {
  async sendVerificationEmail(email, verificationToken) {
    this.setCredentials();

    const conf = getConfig();
    const verificationUrl = `${conf.api.url}/auth/verify/${verificationToken}`;

    return sgMail.send({
      to: email,
      from: conf.sendgrid.sender,
      subject: "Please verify your email",
      html: `<a href="${verificationUrl}">verify now</a>`,
    });
  }

  setCredentials() {
    sgMail.setApiKey(getConfig().sendgrid.apiKey);
  }
}

exports.mailingClient = new MailingClient();

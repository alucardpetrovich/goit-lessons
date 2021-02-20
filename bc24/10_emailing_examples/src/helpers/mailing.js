import sgMail from "@sendgrid/mail";

class MailingHelper {
  async sendVerificationEmail(newUser) {
    const verificationLink = `${process.env.BASE_URL}/auth/verify?verificationToken=${newUser.verificationToken}`;

    return sgMail.send({
      to: newUser.email,
      from: process.env.SENDER_EMAIL,
      subject: "Please verify your email",
      html: `
        <h2>In order to verify your account please follow provided link</h2>
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    });
  }
}

export const mailingHelper = new MailingHelper();

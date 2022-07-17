const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  await sgMail.send({
    to: "mykola.levkiv@gmail.com", // Change to your recipient
    from: process.env.SENDGRID_SENDER, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-6d85c24c6bac4e22948316602ffc62e1",
    dynamicTemplateData: {
      wineTasting: "Our wine always tasting good.",
    },
  });
}
main();

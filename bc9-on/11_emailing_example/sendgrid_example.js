const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail
  .send({
    to: "reloaderlev@gmail.com", // Change to your recipient
    from: "mykola.levkiv@gmail.com", // Change to your verified sender
    // subject: "Sending with SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-f50aa283afee4a87ac2bb7eb595d32e9",
    dynamicTemplateData: {
      instructions: "First you need to run fast",
    },
  })
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

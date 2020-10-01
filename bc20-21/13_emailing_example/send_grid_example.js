const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_TOKEN);

const msg = {
  to: "mykola.levkiv@gmail.com", // Change to your recipient
  from: "reloaderlev@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html:
    "<strong>and easy to do anywhere, even with Node.js</strong><script>alert();</script>",
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

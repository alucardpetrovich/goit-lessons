const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_KEY);

const msg = {
  to: "mykola.levkiv@gmail.com",
  from: "reloaderlev@gmail.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strongasdfsdf>and easy to do anywhere, even with Node.js</strong>",
};

async function main() {
  const result = await sgMail.send(msg);

  console.log(result);
}
main();

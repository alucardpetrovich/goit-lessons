const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

sgMail.setApiKey(process.env.SENDGRID_API_TOKEN);

async function main() {
  const result = await sgMail.send({
    to: "mykola.levkiv@gmail.com",
    from: "mikolaya.levkiv@gmail.com",
    subject: "Sending with SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-325b37b7863f470c84b5521850b0577f",
    dynamicTemplateData: {
      username: "Hello World",
    },
  });

  console.log(result);
}
main();

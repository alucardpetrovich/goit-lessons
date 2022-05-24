const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  // await sgMail.send({
  //   to: "reloaderlev@gmail.com", // Change to your recipient
  //   from: "mykola.levkiv@gmail.com", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // });
  await sgMail.send({
    to: "reloaderlev@gmail.com",
    from: "mykola.levkiv@gmail.com",
    subject: "Marketing email",
    templateId: "d-e5bfdb99075a4a5ba1d49c180c906800",
    dynamicTemplateData: {
      name: "BC13-ON test template",
    },
  });
}
main();

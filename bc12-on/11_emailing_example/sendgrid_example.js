const dotenv = require("dotenv");
const path = require("path");
const sgMail = require("@sendgrid/mail");

dotenv.config({ path: path.join(__dirname, ".env") });
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  const res = await sgMail.send({
    to: "reloaderlev@gmail.com",
    from: "mykola.levkiv@gmail.com",
    subject: "Sending with SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-ef4cee12a0884a498e7bddb354677b68",
    dynamicTemplateData: {
      organizationName: "GoIT Inc.",
    },
  });

  console.log(res);
}
main();

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  const result = await transport.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: ["mykola.levkiv@gmail.com", "reloaderlev@gmail.com"],
    subject: "Hello nodemailer",
    html: "<b>This is nodemailer email</b>",
    attachments: [
      {
        filename: "oauth2flow.png",
        path: path.join(__dirname, "oauth2flow.png"),
      },
    ],
  });

  console.log(result);
}
main();

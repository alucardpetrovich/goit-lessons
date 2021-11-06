const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");

dotenv.config({ path: path.join(__dirname, ".env") });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function main() {
  await transporter.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: "reloaderlev@gmail.com",
    subject: "Test Nodemailer",
    html: "<b>Nodemailer test</b>",
    attachments: [
      {
        filename: "garkusha.jpeg",
        path: path.join(__dirname, "detailed_picture.jpeg"),
      },
    ],
  });
}
main();

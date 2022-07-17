const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;

dotenv.config({ path: path.join(__dirname, ".env") });

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function main() {
  await transport.sendMail({
    to: "reloaderlev@gmail.com",
    from: process.env.NODEMAILER_EMAIL,
    subject: "nodemailer test",
    html: "<b>Hello nodemailer</b>",
    attachments: [
      {
        filename: "image.jpg",
        content: await fs.readFile("photo_2022-06-29 20.43.46.jpg"),
        encoding: "binary",
      },
    ],
  });
  console.log("Send was successful");
  process.exit(0);
}
main();

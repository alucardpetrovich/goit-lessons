const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;

dotenv.config({ path: path.join(__dirname, ".env") });

async function main() {
  const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  const res = await transport.sendMail({
    from: NODEMAILER_USER,
    to: "reloaderlev@gmail.com",
    subject: "Hello nodemailer",
    html: "<b>Hello from nodemailer</b>",
    attachments: [
      {
        filename: "image.jpg",
        contentType: "image/jpg",
        content: await fs.readFile("2022-04-26 18.03.25.jpg"),
      },
    ],
  });

  console.log(res);
}
main();

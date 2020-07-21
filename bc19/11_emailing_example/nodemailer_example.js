const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const nodemailer = require("nodemailer");
const { promises: fsPromises } = require("fs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

async function main() {
  await transporter.sendMail({
    to: "mykola.levkiv@gmail.com",
    from: "reloaderlev@gmail.com",
    subject: "Hello nodemailer",
    text: "Hello nodemailer email with file",
    attachments: [
      {
        filename: "example.gif",
        content: await fsPromises.readFile("600x266_flex_1.gif", "base64"),
        encoding: "base64",
      },
    ],
  });
}

main();

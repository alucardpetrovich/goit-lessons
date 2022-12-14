const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;

dotenv.config({ path: path.join(__dirname, ".env") });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
  secure: true,
});

async function main() {
  await transport.sendMail({
    to: "reloaderlev@gmail.com",
    subject: "Nodemailer test",
    html: "<b>This is a nodemailer test</b>",
    attachments: [
      {
        content: await fs.readFile("image3e23.png"),
        filename: "meme.png",
        encoding: "binary",
      },
    ],
  });
  process.exit(0);
}
main();

const dotenv = require("dotenv");
const path = require("path");
const nodemailer = require("nodemailer");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, ".env") });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_LOGIN,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  const result = await transport.sendMail({
    from: process.env.NODEMAILER_LOGIN,
    to: "mykola.levkiv@gmail.com",
    subject: "Testing Nodemailer",
    html: "<b>Test has passed successfully</b>",
    attachments: [
      {
        filename: "ghost.png",
        contentType: "image/png",
        content: await fs.promises.readFile("test.png"),
      },
    ],
  });

  console.log(result);
}
main();

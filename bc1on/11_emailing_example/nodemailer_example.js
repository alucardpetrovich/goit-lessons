const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  await transport.sendMail({
    to: "mykola.levkiv@gmail.com",
    from: process.env.NODEMAILER_EMAIL,
    subject: "Nodemailer test",
    html: "<strong>Nodemailer test</strong>",
  });
}
main();

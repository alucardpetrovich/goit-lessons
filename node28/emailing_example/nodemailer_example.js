const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, ".env") });

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  const result = await transporter.sendMail({
    to: ["mykola.levkiv@gmail.com"],
    from: process.env.NODEMAILER_EMAIL,
    subject: "nodemailer test",
    html: "<b>This is nodemailer test</b>",
  });

  console.log(result);
}
main();

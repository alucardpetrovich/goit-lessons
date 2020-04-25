const nodemailer = require("nodemailer");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const mailOptions = {
  from: process.env.NODEMAILER_USER, // sender address
  to: ["reloaderlev@gmail.com", "mykola.levkiv@gmail.com"], // list of receivers
  subject: "Second email", // Subject line
  html: "<p>Your html here</p>", // plain text body
};

async function main() {
  const result = await transporter.sendMail(mailOptions);
  console.log(result);
}

main();

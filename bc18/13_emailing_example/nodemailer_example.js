const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
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
    from: process.env.NODEMAILER_EMAIL,
    to: "mykola.levkiv@gmail.com",
    subject: "Hello nodemailer",
    html:
      "<img src='https://miro.medium.com/max/1400/1*mRadzlJaSQhBG47VJUTX4w.png'>",
  });
  console.log(result);
}

main();

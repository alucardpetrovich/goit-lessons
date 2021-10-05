const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

dotenv.config({ path: path.join(__dirname, ".env") });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  console.log(
    await transport.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: ["mykola.levkiv@gmail.com", "reloaderlev@gmail.com"],
      subject: "Nodemailer test email",
      html: "<b>Hello</b>",
      attachments: [
        {
          filename: "screenshot.png",
          encoding: "binary",
          content: await fs.promises.readFile(
            "Screenshot 2021-07-03 at 15.12.56.png"
          ),
        },
      ],
    })
  );
}
main();

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;

dotenv.config({ path: path.join(__dirname, ".env") });

async function main() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Mykola Levkiv" <${process.env.NODEMAILER_EMAIL}>`,
    to: ["reloaderlev@gmail.com", "mykola.levkiv@gmail.com"],
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
    attachments: [
      {
        content: await fs.readFile("package.json"),
        filename: "node_package.json",
        contentType: "application/json",
      },
      {
        content: await fs.readFile("IMG_9337.jpg"),
        filename: "cat_and_dog.jpg",
        encoding: "binary",
      },
    ],
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

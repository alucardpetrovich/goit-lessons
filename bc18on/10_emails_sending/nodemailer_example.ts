import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config({ path: path.join(__dirname, ".env") });

async function main() {
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.NODEMAILER_LOGIN,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const response = await transport.sendMail({
    from: process.env.NODEMAILER_LOGIN,
    to: "reloaderlev@gmail.com",
    subject: "Nodemailer test",
    html: "<strong>Nodemailer test is fun</strong>",
    attachments: [
      {
        filename: "cotton.jpeg",
        content: await fs.promises.readFile("photo_2022-08-09_16-51-14.jpeg"),
        contentType: "image/jpeg",
      },
    ],
  });

  console.log(response);
}
main();

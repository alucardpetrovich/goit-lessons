import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { getPaths } from "./utils.js";
import fs from "fs";

const { __dirname } = getPaths(import.meta.url);
dotenv.config(path.join(__dirname, ".env"));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  await transporter.sendMail({
    to: "mykola.levkiv@gmail.com",
    from: process.env.NODEMAILER_EMAIL,
    subject: "Hello nodemailer",
    html: "<h1>Hello nodemailer</h1>",
    attachments: [
      {
        filename: "lol.png",
        encoding: "binary",
        content: await fs.promises.readFile("league-of-legends.png"),
      },
    ],
  });
}
main();

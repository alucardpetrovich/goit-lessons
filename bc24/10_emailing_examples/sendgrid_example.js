import path from "path";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
import { getPaths } from "./utils.js";

const { __dirname } = getPaths(import.meta.url);
dotenv.config({ path: path.join(__dirname, ".env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "mykola.levkiv@gmail.com", // Change to your recipient
//   from: "reloaderlev@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

const msg = {
  to: "mykola.levkiv@gmail.com",
  from: "reloaderlev@gmail.com",
  templateId: "d-16436f6a495646bcb314a0647e99a95a",
  dynamicTemplateData: {
    Sender_Name: "Sender_Name value",
    Sender_Address: "Sender_Address value",
    Sender_City: "Sender_City value",
    Sender_State: "Sender_State value",
    Sender_Zip: "Sender_Zip value",
  },
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const sgMail = require("@sendgrid/mail");
const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail
  .send({
    to: "reloaderlev@gmail.com", // Change to your recipient
    from: "mykola.levkiv@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    templateId: "d-89727908f2524a139c360c45d08b34f7",
    dynamicTemplateData: {
      username: "Mykola",
    },
    attachments: [
      {
        filename: "bird.jpg",
        content: fs.readFileSync("1605639326417.jpg", "base64"),
      },
    ],
  })
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

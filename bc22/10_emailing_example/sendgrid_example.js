const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const sgMail = require("@sendgrid/mail");
const fs = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail
  .send({
    to: ["mykola.levkiv@gmail.com", "reloaderlev@gmail.com"], // Change to your recipient
    from: "reloaderlev@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    // text: "and easy to do anywhere, even with Node.js",
    // html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    templateId: "d-2ec64ace793d49d0adc3bab175ab6311",
    dynamicTemplateData: {
      hello: "world",
    },
    attachments: [
      {
        content: fs.readFileSync("slider_puffin_jpegmini_mobile.jpg", "binary"),
        filename: "bird.jpg",
        type: "byte",
      },
    ],
  })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

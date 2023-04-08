const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs").promises;

dotenv.config({ path: path.join(__dirname, ".env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  // const msg = {
  //   to: "reloaderlev@gmail.com", // Change to your recipient
  //   from: "mykola.levkiv@gmail.com", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };

  await sgMail.send({
    templateId: "d-1c9de1b57c8a43f696e6f67635c595b4",
    to: "reloaderlev@gmail.com", // Change to your recipient
    from: "mykola.levkiv@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    dynamicTemplateData: {
      name: "Mykola",
    },
    attachments: [
      {
        content: await fs.readFile("package.json", "base64"),
        filename: "node_package.json",
        contentType: "application/json",
      },
      {
        content: await fs.readFile("IMG_9337.jpg", "base64"),
        filename: "cat_and_dog.jpg",
        encoding: "base64",
      },
    ],
  });
  console.log("Email sent");
}
main();

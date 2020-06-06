const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const sgMail = require("@sendgrid/mail");
const { promises: fsPromises } = require("fs");

sgMail.setApiKey(process.env.SENDGRID_API_TOKEN);

async function main() {
  const fileContent = await fsPromises.readFile(
    "42058751_477811559404505_4954962645359788032_o.jpg"
  );
  const fileContentBase64 = fileContent.toString("base64");

  const result = await sgMail.send({
    from: "mykola.levkiv@gmail.com",
    to: "reloaderlev@gmail.com",
    subject: "Test email",
    html: "<p>Hello sendgrid emailing</p>",
    attachments: [
      {
        content: fileContentBase64,
        filename: "42058751_477811559404505_4954962645359788032_o.jpg",
        type: "image/jpeg",
        disposition: "attachment",
      },
    ],
  });
  console.log(result);
}
main();

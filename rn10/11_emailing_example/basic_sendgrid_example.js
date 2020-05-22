const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

async function main() {
  const result = await sgMail.send({
    to: ["mykola.levkiv@gmail.com", "reloaderlev@gmail.com"],
    from: "reloaderlev@gmail.com",
    subject: "Hello SendGrid",
    html: "<p>Hello SendGrid emailing</p>",
  });

  console.log(result);
}

main();

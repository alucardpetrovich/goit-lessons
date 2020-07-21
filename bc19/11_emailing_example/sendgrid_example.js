const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function main() {
  console.log(
    await sgMail.send({
      to: "mykola.levkiv@gmail.com",
      from: "reloaderlev@gmail.com",
      subject: "asdfasdfads",
      html: "asdfasdfasdfds",
    })
  );
}

main();

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

async function main() {
  await transport.sendMail({
    from: "mikolaya.levkiv@gmail.com",
    to: "reloaderlev@gmail.com",
    subject: "Nodemailer test",
    html: "Nodemailer test",
  });
}

main();

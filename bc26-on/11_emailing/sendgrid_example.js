const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: "reloaderlev@gmail.com", // Change to your recipient
//   from: "mykola.levkiv@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
const templateMsg = {
  to: "reloaderlev@gmail.com", // Change to your recipient
  from: "mykola.levkiv@gmail.com", // Change to your verified sender
  subject: "testing templates",
  templateId: "d-6ff250f9aed242dfb2bb6e365221d0df",
  dynamicTemplateData: {
    testVar: "this text was settled via code",
    testImage:
      "https://img.freepik.com/free-vector/graphic-design-geometric-wallpaper_52683-34399.jpg",
  },
};
sgMail
  .send(templateMsg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });

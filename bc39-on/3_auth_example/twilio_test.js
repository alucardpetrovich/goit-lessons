const dotenv = require("dotenv");
const { Twilio } = require("twilio");

dotenv.config();

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function main() {
  await client.messages.create({
    from: process.env.TWILIO_FROM_NUMBER,
    to: process.env.PERSONAL_PHONE_NUMBER,
    body: "Your authorization code is 123123",
  });

  console.log("Message send");
}
main();

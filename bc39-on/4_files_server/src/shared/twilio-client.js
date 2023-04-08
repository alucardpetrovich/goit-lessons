const { getConfig } = require("../config");
const { Twilio } = require("twilio");

class TwilioClient {
  get #client() {
    const { twilio } = getConfig();
    return new Twilio(twilio.accountSid, twilio.authToken);
  }

  async sendSms(phoneNumber, body) {
    const { twilio } = getConfig();

    await this.#client.messages.create({
      from: twilio.fromNumber,
      to: phoneNumber,
      body,
    });
  }
}

exports.twilioClient = new TwilioClient();

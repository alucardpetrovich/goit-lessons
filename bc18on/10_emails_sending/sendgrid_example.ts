import sendgrid from "@sendgrid/mail";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.join(__dirname, ".env") });

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

async function main() {
  await sendgrid.send({
    from: "reloaderlev@gmail.com",
    to: "mykola.levkiv@gmail.com",
    // subject: "Sendgrid test",
    // html: "Sendgrid test is fun",
    templateId: "d-d232047de51f4668bb4aecf01678e2b6",
    dynamicTemplateData: {
      mailHeader: "Hello, this is a dynamic email header",
    },
  });
}
main();

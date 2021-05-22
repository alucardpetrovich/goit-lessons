const { Storage } = require("@google-cloud/storage");

const storage = new Storage({ keyFilename: "gcp_key.json" });

async function main() {
  const result = await storage
    .bucket("bc25-example")
    .upload("./image_2021-04-04_14-52-13.png", { destination: "quote.png" });

  console.log("result", result);
}
main();

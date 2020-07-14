function main(
  bucketName = "goit_bc19_segment",
  filename = ".\\upload\\1594748236496.png"
) {
  const { Storage } = require("@google-cloud/storage");

  // Creates a client
  const storage = new Storage({
    keyFilename: "./still-minutia-283316-4fce94ca15d5.json",
  });

  async function uploadFile() {
    // Uploads a local file to the bucket
    const fileStats = await storage.bucket(bucketName).upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      // By setting the option `destination`, you can change the name of the
      // object you are uploading to a bucket.
      metadata: {
        // Enable long-lived HTTP caching headers
        // Use only if the contents of the file will never change
        // (If the contents will change, use cacheControl: 'no-cache')
        cacheControl: "public, max-age=31536000",
      },
    });

    console.log(fileStats);
  }

  uploadFile().catch(console.error);
  // [END storage_upload_file]
}

main();

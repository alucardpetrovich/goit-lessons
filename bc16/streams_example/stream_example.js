const fs = require("fs");
const { Transform } = require("stream");

const myTransform = new Transform({
  // readableObjectMode: true,
  // writableObjectMode: true,
  transform(chunk, encoding, callback) {
    console.log(chunk);
    // const data = chunk.toString().split("").reverse().join("");

    // console.log("data", data);

    callback(null, chunk);
  },
});

// const content = fs.readFileSync("large_file.txt", "utf-8");

// fs.writeFileSync("large_file.txt");

// 1. ReadStream - Ex: stream for reading files or req obj
// 2. WriteSteam - Ex: stream for writing files or res obj
// 3. Transform - reverse, compress
// 4. Duplex -

// read file -> change enc -> compress -> send

const readStream = fs.createReadStream("package.json", "utf-8");

const writeStream = fs.createWriteStream("package-copy.json");

readStream.pipe(myTransform).pipe(writeStream);
// read chunk from file -> transform chunk -> write chunk to file

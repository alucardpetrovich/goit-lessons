class BodyHelper {
  static async aggregateBody(req) {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    return new Promise((res, rej) => {
      req.on("abort", () => {
        rej("Request aborted");
      });
      req.on("end", () => {
        res(body);
      });
    });
  }
}

module.exports = BodyHelper;

const formidable = require("formidable");

class FormDataMiddleware {
  constructor() {}

  parse(req, res, next) {
    try {
      const body = {};
      const form = new formidable.IncomingForm();
      form.uploadDir = "/var/images";

      return form
        .parse(req)
        .on("field", (name, value) => {
          body[name] = value;
        })
        .on("file", (name, file) => {
          if (name === "photo") {
            body["photo_url"] = file.path;
          }
        })
        .on("end", () => {
          req.body = body;
          next();
        })
        .on("aborted", () => next(new Error("Aborted")))
        .on("error", next);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FormDataMiddleware();

const Joi = require("joi");

exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const result = schema.validate(req[reqPart], { abortEarly: false });
    if (result.error) {
      return res.status(400).send(result.error);
    }

    req[reqPart] = result.value;
    next();
  };
};

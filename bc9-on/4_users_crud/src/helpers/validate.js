exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const validationResult = schema.validate(req[reqPart], {
      stripUnknown: true,
    });
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    req.body = validationResult.value;

    next();
  };
};

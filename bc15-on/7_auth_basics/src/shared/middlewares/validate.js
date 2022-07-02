exports.validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const validationRes = schema.validate(req[reqPart]);
    if (validationRes.error) {
      return res.status(400).send(validationRes.error);
    }

    req[reqPart] = validationRes.value;
    next();
  };
};

class ValidationHelper {
  validateId(req, res, next) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send();
    }

    next();
  }
}

module.exports = new ValidationHelper();

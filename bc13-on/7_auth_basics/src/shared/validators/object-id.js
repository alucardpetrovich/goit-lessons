const { ObjectId } = require("mongodb");

module.exports.objectId = (value, helper) => {
  if (!ObjectId.isValid(value)) {
    return helper.message(`Value '${value}' is not valid MongoDB ObjectID`);
  }

  return true;
};

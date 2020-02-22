const mongoose = require("mongoose");
const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Disabled"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);
sessionSchema.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true
});

sessionSchema.statics.createSession = createSession;
sessionSchema.statics.getSessionById = getSessionById;
sessionSchema.statics.disableSession = disableSession;

async function createSession(userId) {
  return this.create({
    userId
  });
}

async function getSessionById(id) {
  return this.findById(id).populate("user");
}

async function disableSession(id) {
  return this.updateOne({ _id: id }, { $set: { status: "Disabled" } });
}

module.exports = {
  SessionModel: mongoose.model("Session", sessionSchema)
};

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

async function createSession(userId) {
  return this.create({
    userId
  });
}

module.exports = {
  SessionModel: mongoose.model("Session", sessionSchema)
};

const mongoose = require("mongoose");
const {
  Schema,
  Types: { ObjectId },
} = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
  status: {
    type: String,
    required: true,
    enum: ["Verified", "Created"],
    default: "Created",
  },
  verificationToken: { type: String, required: false },
  favouriteFilmIds: [{ type: ObjectId, ref: "Film" }],
});

userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateToken = updateToken;
userSchema.statics.createVerificationToken = createVerificationToken;
userSchema.statics.findByVerificationToken = findByVerificationToken;
userSchema.statics.verifyUser = verifyUser;
userSchema.statics.removeFavouriteFilm = removeFavouriteFilm;
userSchema.statics.addFavouriteFilm = addFavouriteFilm;

async function findUserByIdAndUpdate(userId, updateParams) {
  return this.findByIdAndUpdate(
    userId,
    {
      $set: updateParams,
    },
    {
      new: true,
    }
  );
}

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
}

async function createVerificationToken(userId, verificationToken) {
  return this.findByIdAndUpdate(
    userId,
    {
      verificationToken,
    },
    {
      new: true,
    }
  );
}

async function findByVerificationToken(verificationToken) {
  return this.findOne({
    verificationToken,
  });
}

async function verifyUser(userId) {
  return this.findByIdAndUpdate(
    userId,
    {
      status: "Verified",
      verificationToken: null,
    },
    {
      new: true,
    }
  );
}

async function removeFavouriteFilm(userId, filmId) {
  return this.findByIdAndUpdate(
    userId,
    {
      $pull: { favouriteFilmIds: filmId },
    },
    {
      new: true,
    }
  )
  .populate("favouriteFilmIds");
}

async function addFavouriteFilm(userId, filmId) {
  return this.findByIdAndUpdate(
    userId,
    {
      $push: { favouriteFilmIds: filmId },
    },
    {
      new: true,
    }
  )
}

// users
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;

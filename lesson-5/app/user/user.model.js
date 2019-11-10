const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    email: { type: String, required: true, unique: true },

    password_hash: { type: String, required: false },
    password_salt: { type: String, required: false },

    status: { type: Number, required: true },

});
userSchema.statics.findUser = findUser;

function findUser(email) {
    return this.findOne({ email });
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

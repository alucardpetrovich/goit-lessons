import { model, Schema, Model, Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

export interface IUserModel extends Model<User> {
  updateUser(id: string, params: Partial<User>): Promise<User>;
}

const userSchema = new Schema<User, IUserModel>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.statics.updateUser = async function (
  id: string,
  params: Partial<User>
) {
  return this.findByIdAndUpdate(id, params, { new: true });
};

// model name != collection name. User => users
export const UserModel = model<User, IUserModel>("User", userSchema);

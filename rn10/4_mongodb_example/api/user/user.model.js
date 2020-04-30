const { MongoClient, ObjectId } = require("mongodb");

class UserModel {
  constructor() {
    this.users = null;
  }
  // createUser
  // find all users
  // find user by id
  // update user
  // delete user

  async createUser(userParams) {
    await this.getUserCollection();
    const insertResult = await this.users.insertOne(userParams);

    return this.users.findOne({ _id: new ObjectId(insertResult.insertedId) });
  }

  async findAllUsers() {
    await this.getUserCollection();
    return this.users.find().toArray();
  }

  async findUserById(id) {
    await this.getUserCollection();
    if (!ObjectId.isValid(id)) {
      return null;
    }

    console.log("id", id);

    return this.users.findOne({ _id: new ObjectId(id) });
  }

  async updateUserById(id, userParams) {
    await this.getUserCollection();
    if (!ObjectId.isValid(id)) {
      return null;
    }

    return this.users.findOneAndUpdate(
      {
        _id: new ObjectId(id),
      },
      { $set: userParams },
      { new: true }
    );
  }

  async deleteUserById(id) {
    await this.getUserCollection();
    if (!ObjectId.isValid(id)) {
      return null;
    }

    return this.users.deleteOne({ _id: new ObjectId(id) });
  }

  async getUserCollection() {
    if (this.users) {
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_DB_URL);
    const db = client.db(process.env.MONGODB_DB_NAME);

    this.users = await db.createCollection("users");
  }
}

export const userModel = new UserModel();

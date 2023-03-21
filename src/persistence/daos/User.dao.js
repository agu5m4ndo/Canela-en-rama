const MongoDBContainer = require("../containers/MongoDBContainer"),
  userModel = require("../../data/models/user.model.js");
let instance;

class UserDao extends MongoDBContainer {
  constructor() {
    super(userModel);
  }

  async createUser(object) {
    const user = new userModel({
      name: object.name,
      email: object.email,
      password: object.password,
      profilePicture: object.profilePicture,
      phoneNumber: object.phoneNumber,
      cartId: -1,
    });
    await super.create(user);
  }

  async getUserByEmail(email) {
    return await super.getOne({ userEmail: `${email}` });
  }

  //It's not supposed to delete the User
  async deleteUser(email) {
    await super.delete({ userEmail: `${email}` });
  }

  async updateUser(updates) {
    await super.update({ userEmail: user.email }, { $set: updates });
  }

  static getInstance() {
    if (instance == null) {
      instance = new UserDao();
    }
    return instance;
  }
}

module.exports = UserDao;

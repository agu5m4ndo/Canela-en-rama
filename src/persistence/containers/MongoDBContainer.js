const { connectMongoDb } = require("../../data/config/mongodb.js");

class MongoDBContainer {
  constructor(model) {
    this.model = model;
    connectMongoDb();
  }

  async create(object) {
    try {
      await object.save();
    } catch (err) {
      console.log(err);
    }
  }

  async getAll() {
    try {
      return await this.model.find({});
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(identifier) {
    try {
      return await this.model.findOne(identifier);
    } catch (err) {
      console.log(err);
    }
  }

  async getMultiple(identifier) {
    try {
      return await this.model.find(identifier);
    } catch (err) {
      console.log(err);
    }
  }

  async update(identifier, updates) {
    try {
      await this.model.updateOne(identifier, updates);
    } catch (err) {
      console.log(err);
    }
  }

  async delete(identifier) {
    try {
      await this.model.deleteOne(identifier);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = MongoDBContainer;

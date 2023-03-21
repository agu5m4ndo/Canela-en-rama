const MongoDBContainer = require("../containers/MongoDBContainer"),
  { reviewModel } = require("../../data/models/review.model.js");
let instance;

class ReviewDao extends MongoDBContainer {
  constructor() {
    super(reviewModel);
  }

  async createReview(object) {
    const review = new reviewModel({
      ...object,
    });
    await super.create(review);
  }

  async getReviewByEmail(email) {
    return await super.getOne({ userEmail: `${email}` });
  }

  //It's not supposed to delete the review
  async deleteReview(email) {
    await super.delete({ userEmail: `${email}` });
  }

  async updateReview(updates) {
    console.log(updates);
    await super.update({ userEmail: updates.email }, { $set: updates });
  }

  static getInstance() {
    if (instance == null) {
      instance = new ReviewDao();
    }
    return instance;
  }
}

module.exports = ReviewDao;

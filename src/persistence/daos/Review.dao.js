const MongoDBContainer = require("../containers/MongoDBContainer"),
  reviewModel = require("../../data/models/review.model.js");
let instance;

class ReviewDao extends MongoDBContainer {
  constructor() {
    super(reviewModel);
  }

  async createReview(object) {
    const review = new reviewModel({
      stars: object.stars,
      userName: object.name,
      userEmail: object.email,
      profilePicture: object.profilePicture,
      message: object.message,
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

  async updateReview(review) {
    const newReview = {
      stars: review.stars,
      userName: review.name,
      userEmail: review.email,
      profilePicture: review.profilePicture,
      message: review.message,
    };
    await super.update({ userEmail: review.email }, newReview);
  }

  static getInstance() {
    if (instance == null) {
      instance = new ReviewDao();
    }
    return instance;
  }
}

module.exports = ReviewDao;

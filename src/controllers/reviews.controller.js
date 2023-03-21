const Factory = require("../persistence/factory");
const reviewDao = new Factory().selectDao("review");

const createReview = async (req, res) => {
  const review = req.body;
  await reviewDao.createReview(review);
  res.status(201).json({ success: true });
};

const getAllReviews = async (req, res) => {
  const reviews = await reviewDao.getAll();
  res.status(200).json({ sucess: true, reviews });
};

const searchReview = async (req, res) => {
  const { email } = req.query;
  try {
    let review = await reviewDao.getReviewByEmail(email);
    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `No match for email '${email}'`,
    });
  }
};

const removeReview = async (req, res) => {
  const { email } = req.body;
  try {
    await reviewDao.deleteReview(email);
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `No match for email '${email}'`,
    });
  }
};

const editReview = async (req, res) => {
  const review = req.body;
  try {
    await reviewDao.updateReview(review);
    res.status(204).json({ success: true });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `No review was found for user '${review.email}'`,
    });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  removeReview,
  editReview,
  searchReview,
};

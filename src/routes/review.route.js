const { Router } = require("express"),
  router = Router(),
  {
    createReview,
    editReview,
    getAllReviews,
    removeReview,
    searchReview,
  } = require("../controllers/reviews.controller.js"),
  { admin } = require("../middleware/auth.js");

router
  .route("/")
  .get(getAllReviews)
  .post(createReview)
  .put(editReview)
  .delete(removeReview);
router.route("/search").get(searchReview);

module.exports = router;

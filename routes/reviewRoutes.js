const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.createReview);
router.get("/", reviewController.getReviewsByRestaurant);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;


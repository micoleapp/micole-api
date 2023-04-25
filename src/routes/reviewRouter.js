const { Router } = require("express");
const reviewRouter = Router();

const { getReviews, createReview, deleteReviewById, updateReview, getReviewById } = require("../controllers/reviewController");

reviewRouter.get("/", getReviews);
reviewRouter.post("/", createReview);
reviewRouter.get("/:idReview", getReviewById);
reviewRouter.put("/:idReview", updateReview);
reviewRouter.delete("/:idReview", deleteReviewById);

module.exports = reviewRouter;
const express = require("express");
//merge param merge parent route id to child route
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
//server side validation
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, saveRedirectUrl, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");



//reviews post route
router.post("/", isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview));
//delete review
router.delete("/:reviewID", saveRedirectUrl, isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router; 
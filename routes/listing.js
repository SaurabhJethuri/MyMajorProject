const express = require("express");
//doing restructure bulky code
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
//model structure for listing data
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const listingController = require("../controllers/listing.js");
//updole file
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });


//index route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListings));


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show create update Route
router.route("/:id")
    .get(wrapAsync(listingController.showListings))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListings))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListings));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;

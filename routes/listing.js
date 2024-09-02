const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router
  .route("/")
  .get( wrapAsync(listingController.index))
  .post(
    upload.single('listing[image]'),
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );
 

 //NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm); 

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


router.get('/suggestions', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);

  try {
      // Find listings matching the query, limiting fields to avoid sending unnecessary data
      const listings = await Listing.find({
          $or: [
              { title: { $regex: query, $options: 'i' } },
              { location: { $regex: query, $options: 'i' } },
              { country: { $regex: query, $options: 'i' } }
          ]
      }).select('title').limit(10); // Limit to 10 results

      res.json(listings);
  } catch (error) {
      console.error('Error fetching suggestions:', error);
      res.status(500).json([]);
  }
});

module.exports = router;

const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: maptoken });


module.exports.index = async (req, res) => {
  const { category, query } = req.query;  
  let searchFilter = {};
 if (query) {
    searchFilter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { location: { $regex: query, $options: 'i' } },
        { country: { $regex: query, $options: 'i' } }
      ]
    };
  }

  if (category) {
    searchFilter.category = category;
  }

  try {
    const allListing = await Listing.find(searchFilter);
    res.render("listings/index.ejs", { allListing });
  } catch (error) {
    res.render("listings/index.ejs", { allListing: [] });
  }
};





module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  } ;
  
 module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({ 
        path: "review", 
        populate: { path: "author",

         },
         })
      .populate("owner");
    if (!listing) {
      req.flash("error", "The listsing you requested does not exist!");
      res.redirect("/listing");
    }

    res.render("listings/show.ejs", { listing });
  };

  module.exports.createListing = async (req, res, next) => {
                                
    const newListing = new Listing(req.body.listing);
      let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
    .send();

   
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = {url,filename}
    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;
    let savedListing = await newListing.save();
    req.flash("success", "New Listings Created!");
    res.redirect("/listing");
  };


  module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error", "The listing you requested does not exist!");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs", { listing,originalImageUrl });
  } ;

  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (req.body.listing.location && req.body.listing.location !== listing.location) {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
        listing.geometry = response.body.features[0].geometry;
    }
    listing.set(req.body.listing);
    
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
};


 module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
  } 






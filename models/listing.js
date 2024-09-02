const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema =new Schema({
    title : {
        type:String,
        required:true,
    },
    description : {
        type:String
    },
    image: {
        url:String,
        filename:String,
    },
    price : {
        type:Number
    },
    location : {
        type:String
    },
    country : {
        type:String
    },
    review : [
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner :{
       type : Schema.Types.ObjectId,
       ref:"User",
    },
    geometry : {
        type : {
            type : String,
            enum : ["Point"],
            required : true
            },
            coordinates : {
                type : [Number],
                required : true
                }
    },
    category: {
        type: String,
        enum: ['Trending', 'Rooms', 'Iconic Cities', 'Mountain', 'Castles', 'Amazing Pools', 'Camping', 'Farms', 'Arctic'],
        required: true
    }

});
listingSchema.post("findOneAndDelete",async(listing)=> {
    if(listing){
    await Review.deleteMany({review : {$in : listing.review}})
}
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;

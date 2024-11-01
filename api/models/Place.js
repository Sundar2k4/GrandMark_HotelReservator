const mongoose = require('mongoose');


const PlaceSchema = new mongoose.schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    address:String,
    photos:[String],
    description:String,
    perks:[String],
    extraInfo:[String],
    checkIn:Number,
    checkOut:Number,
    maxGuests:Number,


});

const PlaceModel = mongoose.model('place',PlaceSchema);

module.exports= PlaceModel;
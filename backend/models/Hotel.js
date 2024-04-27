const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true,
        default: "Bangkok"
    },
    telephoneNumber: {
        type: String,
        required: true
    },
    starRating: {
        type: Number,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    images: {
        type: Object,
        required: true
    },
    hotelier: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
});


const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
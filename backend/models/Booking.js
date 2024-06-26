const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookDate: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    review: {
        type: mongoose.Schema.ObjectId,
        ref: 'Review',
        default: null
    },
    roomType: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    pointEarned: {
        type: Number,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Booking', BookingSchema);
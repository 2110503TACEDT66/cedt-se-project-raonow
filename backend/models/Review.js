const mongoose = require('mongoose');

// const detailReviewSchema = new mongoose.Schema({

// });

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
        required: true
    },
    hotel: {
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0, max: 10
    },
    title: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    travelerType: {
        type: String,
        enum: ['solo', 'couple', 'family', 'group', 'business'],
        require: true
    },
    attitude: {
        type: String,
        default: 'neutral'
    },
    readStatus: {
        type: String,
        default: 'unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

  
const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
// module.exports = reviewFilterSchema;

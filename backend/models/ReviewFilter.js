const mongoose = require('mongoose');

const reviewFilterSchema = new mongoose.Schema({
    //filter reviews by date, rating, and traveler type
    travelerType: {
      type: Object,
      enum: ['budget', 'starRating', 'province', 'travelerType', 'hotelier', 'createdAt'],
      default: null,
    },
    sort: {
      type: String,
      default: null
    },
    date: {
      type: String,
      default: null
    },
    rating: {
      type: [Number],
      default: []
    },
  });

module.exports = reviewFilterSchema;
const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    campaign: {
        type: mongoose.Schema.ObjectId,
        ref: 'Campaign',
        required: true
    },
    member: {
        type: mongoose.Schema.ObjectId,
        ref: 'Member',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expiryDate: {
        type: Date,
        required: true
    },
    used: {
        type: Boolean,
        required: true,
        default: false
    },
    useBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
    },
    useAt: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
        default: null
    },
    useDate: {
        type: Date,
        default: null
    },
});

module.exports = mongoose.model('Coupon', CouponSchema);
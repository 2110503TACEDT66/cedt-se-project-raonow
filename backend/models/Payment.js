const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    booking: {
        type: mongoose.Schema.ObjectId,
        ref: 'Booking',
    },
    coupon: {
        type: mongoose.Schema.ObjectId,
        ref: 'Coupon',
        default: null
    },
    discountAmount: {
        type: Number,
        default: 0
    },
    logs: [{
        time: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
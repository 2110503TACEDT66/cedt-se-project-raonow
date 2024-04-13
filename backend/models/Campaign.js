const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'Campaign point value must be a number greater than or equal to 0.',
        },      
    },
    onePerUser: {
        type: Boolean,
        required: true,
        default: false
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'fixed'],
        default: 'percentage'
    },
    discountAmount: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'Discount amount must be a number greater than or equal to 0.',
        },
    },
    limitedArea: {
        type: String,
        default: null
    },
    totalAmount: {
        type: Number,
        default: Infinity,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'Coupon amount must be a number greater than or equal to 0.',
        },      
    },
    amountLeft: {
        type: Number,
        required: true,
        default: Infinity,
        validate: {
            validator: (value) => value >= 0,
            message: 'Coupon amount left must be a number greater than or equal to 0.',
        },      
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value >= 0,
            message: 'Campaign duration must be a number greater than or equal to 0.',
        },      
    },
});

module.exports=mongoose.model('Campaign', CampaignSchema);
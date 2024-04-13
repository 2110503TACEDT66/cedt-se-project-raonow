const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    province : {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    point: {
        type: Number,
        default: 0,
        validate: {
            validator: (value) => value >= 0,
            message: 'Point value must be a number greater than or equal to 0.',
        },      
    },
    logs: [{
        action: {
            type: String,
            required: true,
            enum: ['create', 'earn', 'use','other']
        },
        point: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
});

module.exports=mongoose.model('Member', MemberSchema);
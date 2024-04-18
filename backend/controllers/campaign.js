const campaign = require('../models/Campaign');
const mongoose = require('mongoose');

exports.getCampaigns = async (req, res, next) => {
    // everyone can see redeem campaigns
    let query;

    if (req.user.role != 'admin') {
        //general member can see opening campaigns
        query = campaign.find({amountLeft: { $gt: 0 } }).sort({ createdAt: -1 });
    }
    else {     
        //admin can see all campaigns (including closed campaigns)
        query = campaign.find().sort({ createdAt: -1 });
    }

    try {
        const campaigns = await query;

        res.status(200).json({
            success: true,
            data: campaigns,
            count: campaigns.length
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}

exports.createCampaign = async (req, res, next) => {
    //admin can create campaign
    //request schema
    // let exampleRequest = {
    //     title: "Campaign Title",
    //     description: "Campaign Description",
    //     point: 100,
    //     onePerUser: false,
    //     discountType: "percentage",
    //     discountAmount: 10,
    //     limitedArea: "Optional",
    //     totalAmount: 100,
    //     duration: 30
    // }
    try {
        req.body.amountLeft = req.body.totalAmount;
        const campaigns = await campaign.create(req.body);

        res.status(201).json({
            success: true,
            data: campaigns,
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}

exports.updateCampaign = async (req, res, next) => {
    //admin can update campaign
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let campaigns = await campaign.findByIdAndUpdate(req.params.id, req.body,
            { new: true, runValidators: true });

        if (!campaigns) {
            return res.status(400).json({
                success: false
            });
        }

        res.status(200).json({
            success: true,
            data: campaigns
        });
    } catch (err) {
        await session.abortTransaction();
        res.status(400).json({
            success: false
        });
        // console.log(err.stack);
    } finally {
        session.endSession();
    }
}

exports.deleteCampaign = async (req, res, next) => {
    //admin can delete campaign
    try {
        const campaigns = await campaign.findByIdAndDelete(req.params.id);

        if (!campaigns) {
            return res.status(400).json({
                success: false
            });
        }

        const coupon = require('../models/Coupon');
        await coupon.deleteMany({campaign: req.params.id});

        res.status(200).json({
            success: true,
            data: campaigns
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
        console.log(err.stack);
    }
}

exports.getCampaign = async (req, res, next) => {
    try {
        const campaigns = await campaign.findById(req.params.id);

        res.status(200).json({
            success: true,
            data: campaigns
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
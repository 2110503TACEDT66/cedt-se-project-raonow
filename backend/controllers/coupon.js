const coupon = require('../models/Coupon');
const campaigns = require('../models/Campaign')
const members = require('../models/Member')
const mongoose = require('mongoose');

exports.getCoupons = async (req, res, next) => {
    let query;

    if (req.user.role != 'admin') {
        //general member can see only their coupons
        query = coupon.find({user:req.user.id})
            .sort({ createdAt: -1 })
            .populate('campaign');
    }
    else {
        //admin can see all coupons
        query = coupon.find()
            .sort({ createdAt: -1 })
            .populate('campaign');;
    }

    try {
        const coupons = await query;

        res.status(200).json({
            success: true,
            data: coupons
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}

//GET COUPON BY COUPON CODE (code)
exports.getCoupon = async (req, res, next) => {
    //check if the coupon is valid
    try {
        const coupons = await coupon.findOne({code: req.params.id}).populate('campaign');

        if (!coupons) {
            return res.status(400).json({
                success: false
            });
        }

        res.status(200).json({
            success: true,
            data: coupons
        });
    
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}

//@desc     Redeem point to create coupon
//@route    POST /api/v1/coupon
//@access   Private
exports.createCoupon = async (req, res, next) => {
    // use at redeeming point to get a coupon
    // #request schema
    // let exampleRequest = {
    //     campaign: campaignId,
    // }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        //find redeeming campaign
        const campaign = await campaigns.findById(req.body.campaign);

        if (!campaign) {
            return res.status(404).json({
                success: false,
                message: "Campaign not found"
            });
        }
    
        //find member
        const member = await members.findOne({user: req.user.id});
        
        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Member not found"
            });
        }
        
        //check if one per user
        if (campaign.onePerUser) {
            if (await coupon.findOne({campaign: req.body.campaign, member: member._id})) {
                return res.status(401).json({
                    success: false,
                    message: "This coupon is limited to one per user."
                });
            }
        }
    
        //check member's point
        if (campaign.point > member.point) {
            return res.status(401).json({
                success: false,
                message: "Not enough point"
            });
        }
    
        //update member's point
        member.point -= campaign.point;
        member.logs.push({
            action: 'use',
            point: campaign.point,
            description: `Redeem ${campaign.point} point for ${campaign.title} coupon`
        });
        await member.save({ session });

        //update campaign amount left
        campaign.amountLeft -= 1;
        await campaign.save({ session });

        //create coupon
        let couponCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let createCoupon = {
            code: couponCode,
            campaign: req.body.campaign,
            member: member._id,
            createdAt: Date.now(),
            expiryDate: Date.now() + (campaign.duration * 24 * 60 * 60 * 1000),
            used: false,
            useBy: null,
            useAt: null,
            useDate: null,
        }

        const newCoupon = await coupon.create([createCoupon], { session });

        await session.commitTransaction();

        res.status(201).json({
            success: true,
            data: newCoupon,
            member: member
        });
    } catch (error) {
        await session.abortTransaction();
    
        res.status(400).json({
            success: false,
            message: "Error creating coupon"
        });
        console.log(error.stack);
    } finally {
        session.endSession();
    }
}
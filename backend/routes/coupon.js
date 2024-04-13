const express = require('express');

const {getCoupons, getCoupon, createCoupon}
    = require('../controllers/coupon');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getCoupons)
    .post(protect, createCoupon);

router.route('/:id')
    .get(protect, getCoupon);
    
module.exports=router;
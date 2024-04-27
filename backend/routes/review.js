const express = require('express');
const {getReviews, createReview} = require('../controllers/review');

const router = express.Router({mergeParams:true});
const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getReviews)
    .post(protect, createReview);

module.exports=router;
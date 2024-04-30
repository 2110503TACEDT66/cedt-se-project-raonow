const Review = require('../models/Review');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.getReviews= async (req,res,next) => {
    console.log(req.user.role);
    if (req.query.id) {
        try {
            const reviews = await Review.findById(req.query.id)
                .populate({path: 'user', select: 'name'})
                .populate({path: 'booking', select: 'roomType duration bookDate'});
            if (!reviews) throw new Error('No reviews found');
            res.status(200).json({success: true, data: {reviews: reviews}});
            return;
        } catch (err) {
            res.status(400).json({success: false});
        }
    }
    if (req.query.lastCheck) {
        try {
            const lastCheckDate = new Date(req.query.lastCheck);
            const newReviews = await Review.find({ createdAt: { $gt: lastCheckDate } });
            if (newReviews.length > 0) {
                res.status(200).json({ success: true, data: newReviews });
            } else {
                res.status(200).json({ success: false, message: 'No new reviews since last check' });
            }
        } catch (err) {
            res.status(400).json({ success: false });
        }
        return;
    }

    console.log('queryReview: ' + JSON.stringify(req.query));
    //filter reviews by date, rating, and traveler type
    let query;

    //Copy req.query
    let reqQuery = {...req.query};

    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'rating'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param=>delete reqQuery[param]);

    //add hotel from req.params to req.query
    if (req.params.hotelId && req.params.hotelId !== 'all') {
        req.query.hotel = req.params.hotelId;
    }
    
    //Create query string
    let queryStr = JSON.stringify(req.query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`);

    // Add a condition to search for location in the address field
    if (req.query.address) {
        queryStr = JSON.parse(queryStr);
        queryStr.address = { $regex: req.query.address, $options: 'i' };
        queryStr = JSON.stringify(queryStr);
    }

    //add rating filter
    if (req.query.rating) {
        const ratings = req.query.rating.split(',').map(Number);
        queryStr = JSON.parse(queryStr);
        console.log(queryStr);
        queryStr.rating = { $in: ratings };
        queryStr = JSON.stringify(queryStr);            
    }

    console.log('queryStr' + queryStr);
    //finding resource
    query = Review.find(JSON.parse(queryStr))
        .populate({path: 'user', select: 'name'})
        .populate({path: 'booking', select: 'roomType duration bookDate'})
        .populate({path: 'hotel', select: 'name'});
    //.populate('bookings');

    //Select fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort
    if(req.query.sort && req.query.sort !== 'mostRelevant') {
        const sortBy = req.query.sort.split(',').join(' ');
        console.log(sortBy);
        query = query.sort(sortBy);
    } else {
        query = query.sort('name');
    }

    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Review.countDocuments();

    query = query.skip(startIndex).limit(limit);

    try {
        //Executing query
        const reviews = await query;
        console.log(req.query);

        //Pagination result
        const pagination = {};

        if(endIndex<total) {
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(startIndex>0) {
            pagination.prev={
                page:page-1,
                limit
            }
        }

        res.status(200).json({success:true, count: reviews.length, pagination, data: reviews});
    } catch(err) {
        res.status(400).json({success: false});
    }  
};

exports.getReviewHeader = async (req, res, next) => {
  console.log(req.params.hotelId);
  try {
    const results = await Review.aggregate([
      {
        $match: {
          hotel: mongoose.Types.ObjectId.createFromHexString(
            req.params.hotelId
          ),
        },
      },
      {
        $group: {
          _id: "$hotel",
          averageRating: { $avg: "$rating" },
          totalReviewCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.hotel",
          averageRating: { $avg: "$averageRating" },
          totalReviewCount: { $sum: "$totalReviewCount" },
          // ratingsPerTravelerType: {
          //   $push: {
          //     name: "$_id.travelerType",
          //     travelerType: "$_id.travelerType",
          //     count: "$totalReviewCount",
          //   },
          // },
        },
      },
      {
        $project: {
          _id: 0,
          // hotel: "$_id",
          averageRating: 1,
          totalReviewCount: 1,
          // ratingsPerTravelerType: 1,
        },
      },
    ]);
    if (results.length > 0) {
        results[0].hotel = req.params.hotelId;
    }
    console.log("header: " + results);
    res.status(200).json({
      success: true,
      data: results[0],
    });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false });
  }
};

exports.createReview = async (req, res, next) => {
    try {
        console.log(req.body);
        const existedReview = await Review.findOne({booking: req.body.review.booking});
        if (existedReview && req.user.role !== 'admin') {
            return res.status(401).json({success: false, message: 'You have already reviewed this hotel'});
        }
        const review = await Review.create(req.body.review);
        const booking = await Booking.findByIdAndUpdate(req.body.review.booking, {review: review._id}, {new: true});
        res.status(201).json({
            success: true,
            data: review
        });
    } catch(err) {
        res.status(400).json({
            success: false
        });
        console.log(err.stack)
    }
}

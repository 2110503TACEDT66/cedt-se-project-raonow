const Booking = require('../models/Booking');
const Member = require('../models/Member');
const Hotel = require('../models/Hotel');
const Payment = require('../models/Payment');
const mongoose = require('mongoose');

exports.getBookings= async (req,res,next)=>{
    let query;

    //General users can see only their booking
    if(req.user.role != 'admin') {
        query = Booking.find({user:req.user.id}).populate({
            path: 'user',
            select: 'name email telephoneNumber'
        }).populate('hotel');
    } else { //Admin can see all
        if(req.params.hotelId) {
            console.log(req.params.hotelId);

            query = Booking.find({hotel:req.params.hotelId}).populate({
                path: 'user',
                select: 'name telephoneNumber email'
            }).populate('hotel');

            } else {
            query = Booking.find().populate({
                path: 'user',
                select: 'name telephoneNumber email'
            }).populate('hotel');
        }
    }

    try {
        const bookings = await query;

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
            isAdmin: req.user.role === 'admin' ? true : false
        });
    } catch (error) {
        console.log(error.stack);
        return res.status(500).json({
            success: false,
            message: "Cannot find Booking"
        });
    }
};

exports.getBooking= async (req,res,next)=>{
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path: 'user',
            select: 'name telephoneNumber email'
        }).populate('hotel');

        if(!booking) {
            return res.status(404).json({sucess: false, message: `No booking with the id of ${req.params.id}`});
        }
        
        //Make sure user is the booking owner
        if(booking.user._id.toString()!== req.user._id.toString() && req.user.role !== 'admin'){
		    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this booking`});
	    }

        res.status(200).json({success: true,data: booking});
    } catch(error) {
        console.log(error.stack);
        return res.status(500).json({success: false, message: "Cannot find booking"});
    }
};

exports.createBooking = async (req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {        
        //add hotel Id to req.body
        req.body.hotel=req.params.hotelId;

        //find hotel
        const hotel = await Hotel.findById(req.params.hotelId);
    
        if(!hotel) {     
            return res.status(404).json({success:false,message: `No hotel with the id of ${req.params.hotelId}`});
        }

        //add user Id to req.body 
        req.body.user=req.user.id;

        //Check for existed booking
        const existedBookings = await Booking.find({user:req.user.id});

        //If the user is not an admin, they can only create 3 booking.
        if(existedBookings.length >= 3 && req.user.role !== 'admin'){
            return res.status(400).json({success:false, message:`The user with ID ${req.user.id} has already made 3 bookings`});
        }

        let discountAmount = 0;
        let couponID = null;

        if (req.body.coupon && req.body.coupon !== '') {
            //get coupon data from body
            const couponModel = require('../models/Coupon');
            const couponData = await couponModel.findOne({code: req.body.coupon}).populate('campaign');
            couponID = couponData._id;

            //check if coupon is exist
            if (!couponData) {
                return res.status(404).json({
                    success:false,
                    message:`No coupon with the code of ${req.body.coupon}`}
                );
            }
            //check if coupon is used
            if (couponData.used) {
                return res.status(400).json({
                    success:false,
                    message:`Coupon with the code of ${req.body.coupon} has been used}`
                });
            }
            //check if coupon is used in designated area
            if (couponData.campaign.limitedArea) {
                if (!hotel.address.includes(couponData.data.campaign.limitedArea)) {
                    return res.status(400).json({
                        success:false,
                        message:`Coupon with the code of ${req.body.coupon} is not valid for this hotel}`
                    });
                }
            }
            //check if coupon is expired
            if (couponData.expiryDate < Date.now()) {
                return res.status(400).json({
                    success:false,
                    message:`Coupon with the code of ${req.body.coupon} has expired}`
                });
            }

            //apply change to coupon
            couponData.used = true;
            couponData.usedBy = req.user.id;
            couponData.usedAt = hotel._id;
            couponData.usedDate = Date.now();   
            await couponData.save({session});       

            //apply discount
            if (couponData.campaign.discountType === 'percentage') {
                discountAmount = couponData.campaign.discountAmount;
            } else {
                discountAmount = -1 * couponData.campaign.discountAmount;
            }
        }

        //calculate hotel price with room type
        let hotel_price = hotel.basePrice;

        if (req.body.roomType === 'Suite') {
            if (hotel.starRating === 5) hotel_price += 1000;
            else hotel_price += 600;
        }
        else if (req.body.roomType === 'Executive Suite') {
            hotel_price += 2000;
        }

        //calculate duration
        hotel_price = hotel_price * req.body.duration;

        //calculate discount
        if (discountAmount < 0) {
            discountAmount = hotel_price * discountAmount / 100;
        }

        //write payment data
        let paymentData = {
            amount: hotel_price,
            coupon: couponID,
            discountAmount: discountAmount,
            logs: [{
                amount: hotel_price,
                description: `User ${req.body.user} book hotel ${hotel._id} room type ${req.body.roomType} for ${req.body.duration} nights. Total price: ${hotel_price}.`
            }]
        };

        //add coupon to description
        if (req.body.coupon) {
            paymentData.logs[0].description += ` Use coupon ${req.body.coupon} for discount ${discountAmount}`;
        }

        //check membership
        const memberData = await Member.findOne({user: req.user.id});

        //initialize point earned
        req.body.pointEarned = null;

        //add point to member
        if (memberData) {
            earnedPoint = (hotel_price - discountAmount) / 10;
            memberData.point += earnedPoint;
            req.body.pointEarned = earnedPoint;
            memberData.logs.push({
                action: 'earn',
                point: (hotel_price - discountAmount) / 10,
                description: `Earn ${Math.floor((hotel_price - discountAmount) / 10)} point for booking hotel ${hotel._id}.`
            });
            memberData.save({ session: session })
        }

        //create booking and payment
        const [booking, payment] = await Promise.all([
            Booking.create([req.body], {session}),
            Payment.create([paymentData], { session: session })
        ]);
        await Payment.findByIdAndUpdate(payment._id, { booking: booking._id }, { session: session });
        
        await session.commitTransaction();
        res.status(200).json({
            success:true,
            data: {
                booking: booking,
                payment: payment,
                member: memberData ? memberData : null
            },
        });

    } catch (err) {
        session.abortTransaction();
        console.log(err.stack);
        return res.status(500).json({
            success:false,
            message:"Cannot create booking",
        });
    } finally {
        session.endSession();
    }
};

exports.updateBooking= async (req,res,next)=>{
	try {
		let booking = await Booking.findById(req.params.id);

		if (!booking){
			return res.status(404).json({success:false,message:`No booking with the id of ${req.params.id}`});
		}

        //Make sure user is the booking owner
        if(booking.user._id.toString()!== req.user._id.toString() && req.user.role !== 'admin'){
		    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to update this booking`});
	    }

        // let fee = 100;
        // let logDescription = 'Update booking';

        // Check if hotel has been changed
        // if (req.body.hotel && booking.hotel.toString() != req.body.hotel) {
        //     fee += 900; // Add fee for changing hotel
        //     logDescription += `Change hotel from ${booking.hotel} to ${req.body.hotel}. `;
        // }

		booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
			new:true,
			runValidators:true
		});

        // payment = await Payment.findOneAndUpdate(
        //     { booking: booking._id }, 
        //     { 
        //         $inc: { amount: fee },
        //         $push: { logs: { amount: fee, description: logDescription } }
        //     },
        //             {
        //         new: true,
        //         runValidators: true
        //     }
        // );		
        console.log(booking);

		res.status(200).json({
			success:true,
			data: booking,
		});

	} catch (error) {
		console.log(error.stack);
		return res.status(500).json({success:false,message:"Cannot update booking"});
	}
};

exports.deleteBooking=async (req,res,next)=>{
	try {
		const booking = await Booking.findById(req.params.id);
		
		if(!booking){
			return res.status(404).json({success:false,message:`No booking with the id of ${req.params.id}`});
		}

        //Make sure user is the booking owner
        if(booking.user._id.toString()!== req.user._id.toString() && req.user.role !== 'admin'){
		    return res.status(401).json({success:false,message:`User ${req.user.id} is not authorized to delete this booking`});
	    }

		await booking.deleteOne();

		res.status(200).json({success:true, data: {}});

	} catch (error) {
		console.log(error.stack);
		return res.status(500).json({success:false,message:"Cannot delete booking"});
	}
};

exports.getDashboard = async (req, res, next) => {
    let bookingQuery, pointQuery;
    let date = new Date();
    date.setDate(date.getDate() - (60 * 24 * 60 * 60 * 1000));

    bookingQuery = Booking.aggregate([
        {
            '$lookup': {
              'from': 'hotels', 
              'localField': 'hotel', 
              'foreignField': '_id', 
              'as': 'hotelInfo'
            }
          }, {
            '$unwind': '$hotelInfo'
          }, {
            '$group': {
              '_id': '$hotelInfo.province', 
              'count': {
                '$sum': 1
              }
            }
          }, {
            '$project': {
              '_id': 0, 
              'province': '$_id', 
              'count': 1
            }
          }
    ]);

    pointQuery = Member.aggregate([
        {
            '$group': {
              '_id': null, 
              'totalPoint': {
                '$sum': '$point'
              }, 
              'averagePoint': {
                '$avg': '$point'
              }
            }
          }
    ]);

    try {
        const bookingCount = await bookingQuery;
        const point = await pointQuery;

        res.status(200).json({
            success: true,
            data: {
                booking: bookingCount,
                point: point
            }
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
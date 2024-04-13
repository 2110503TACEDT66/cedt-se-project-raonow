const Member = require('../models/Member');

exports.getMembers = async (req, res, next) => {
    try {
        const getMembers = await Member.find().populate({
            path: 'user',
            select: 'name email telephoneNumber role createdAt'
        });

        //get booking count of each member
        let membersWithBookingCount = getMembers.map(async (member) => {
            const bookingCount = await Member.aggregate([
                { $match: { user: member.user } },
                {
                    $lookup: {
                        from: 'Booking',
                        localField: 'user',
                        foreignField: 'user',
                        as: 'Bookings'
                    }
                },
                {
                    $project: {
                        bookingCount: {
                            $size: '$Bookings'
                        }
                    }
                },
            ]);
        
            return {
                ...member._doc,
                bookingCount: bookingCount.length > 0 ? bookingCount[0].bookingCount : 0
            };
        });
        
        let members = await Promise.all(membersWithBookingCount);

        res.status(200).json({
            success: true, 
            count: members.length, 
            data: members
        });
    } catch(err) {
        res.status(400).json({
            success: false
        });
        console.log(err.stack)
    }
};

exports.getMember = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id).populate({
            path: 'user',
            select: 'name email telephoneNumber role createdAt'
        });

        if (!member) {
            return res.status(400).json({
                success: false

            });
        }
        
        member.bookingCount = await Member.aggregate([
            { $match: { user: member.user } },
            {
                $lookup: {
                    from: 'Booking',
                    localField: 'user',
                    foreignField: 'user',
                    as: 'Bookings'
                }
            },
            {
                $project: {
                    bookingCount: {
                        $size: '$Bookings'
                    }
                }
            },
        ]);

        res.status(200).json({
            success: true,
            data: member
        });
    } catch(err) {
        res.status(400).json({
            success: false
        });
        console.log(err.stack)
    }
}

exports.createMember = async (req, res, next) => {
    try {
        req.body.logs = [{
            action: 'create',
            point: 0,
            description: 'Member created.'
        }];

        req.body.user = req.user.id;

        // add point to admin and ensure that member has 0 point
        if (req.user.role === 'admin') {
            req.body.point = 100000;
        } else {
            req.body.point = 0;
        }

        const member = await Member.create(req.body);

        res.status(201).json({
            success: true,
            data: member
        });
    } catch(err) {
        res.status(400).json({
            success: false
        });
        console.log(err.stack)
    }
}

exports.updateMember = async (req, res, next) => {
    try {
        //update member account
        delete req.body.logs;
        const member = await Member.findByIdAndUpdate(req.params, 
            { $push: { logs: `Updated on ${new Date().toISOString()}` }}, 
            { new: false });

        if (!member) {
            return res.status(400).json({
                success: false
            });
        }       

        res.status(200).json({
            success: true,
            data: member
        });


    } catch(err) {
        res.status(400).json({
            success: false
        });
    }
}

exports.deleteMember = async (req, res, next) => {
    try {
        const member = await Member.findByIdAndDelete(req.params);

        if (!member) {
            return res.status(400).json({
                success: false
            });
        }       

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch(err) {
        res.status(400).json({
            success: false
        });
    }
}
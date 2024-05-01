const { createReview } = require('../controllers/review');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

describe("createReview", () => {
    it("should create a review", async () => {
        // Mock request body and necessary data
        const mockReq = {
            body: {
                review: {
                    _id : "662a825b944d5b9b98c83419",
                    user : "66015a8220d99d17b5ff0314",
                    booking : "6621d8944ee97e1f255fc239",
                    hotel : "65e43ae76ab856889745475e",
                    rating : 5,
                    title : "Good job",
                    review : "Very good",
                    travelerType : "family",
                    createdAt :"2024-04-16T10:01:35.352Z",
                }
            },
            user: {
                id : "66015a8220d99d17b5ff0314",
                role: 'user'
            }
        };

        // Mock Review.findOne to return null indicating no existing review
        jest.spyOn(Review, 'findOne').mockResolvedValue(null);
        
        // Mock Review.create to return the created review
        jest.spyOn(Review, 'create').mockResolvedValue({ _id: 'reviewId', ...mockReq.body.review });

        // Mock Booking.findByIdAndUpdate to return the updated booking
        jest.spyOn(Booking, 'findByIdAndUpdate').mockResolvedValue({ _id: 'bookingId', review: 'reviewId' });

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Call the function
        await createReview(mockReq, mockRes);

        // Assert that appropriate methods were called
        expect(Review.findOne).toHaveBeenCalledWith({ booking: mockReq.body.review.booking });
        expect(Review.create).toHaveBeenCalledWith(mockReq.body.review);
        // expect(Booking.findByIdAndUpdate).toHaveBeenCalledWith(mockReq.body.review.booking, { review: 'reviewId' }, { new: true });
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            data: expect.objectContaining(mockReq.body.review)
        });
    });

    // Write additional tests for other scenarios
});
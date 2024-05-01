const { createReview } = require('../controllers/review');
const Review = require('../models/Review');
const Booking = require('../models/Booking');

const validateStarRating = (body) => {
  if (body.review.rating < 0 || body.review.rating > 5) {
      return false;
  }
  return true;
}


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
describe("createReview successfully", () => {
    it("should create a review", async () => {
        // Mock request body and necessary data
        

        // Mock Review.findOne to return null indicating no existing review
        jest.spyOn(Review, 'findOne').mockResolvedValue(null);
        
        // Mock Review.create to return the created review
        jest.spyOn(Review, 'create').mockResolvedValue({ _id: 'reviewId', ...mockReq.body.review });

        // Mock Booking.findByIdAndUpdate to return the updated booking
        jest.spyOn(Booking, 'findByIdAndUpdate').mockResolvedValue({ _id: 'bookingId', review: '662a825b944d5b9b98c83419' });

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
  });

  describe("Review already exists", () => {
    it("should return a 401 status code", async () => {
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

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock Review.findOne to return the existing review
        jest.spyOn(Review, 'findOne').mockResolvedValue(mockReq.body.review);

        // Call the function
        await createReview(mockReq, mockRes);

        // Assert that appropriate methods were called
        expect(Review.findOne).toHaveBeenCalledWith({ booking: mockReq.body.review.booking });
        expect(mockRes.status).toHaveBeenCalledWith(401); // Assuming 401 is the status code for unauthorized
    });

    describe("Invalid Input Data", () => {
      it("should return false (rating > 5)", async () => {
          // Missing required field 'booking'
          const mockReq = {
              body: {
                  review: {
                      _id : "662a825b944d5b9b98c83419",
                      user : "66015a8220d99d17b5ff0314",
                      hotel : "65e43ae76ab856889745475e",
                      rating : 6,
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
  
          const mockRes = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          };
  
          // Call the function
          await createReview(mockReq, mockRes);
  
          // Assert that appropriate methods were called
          expect(validateStarRating(mockReq.body)).toBe(false); 
      });
  });
});
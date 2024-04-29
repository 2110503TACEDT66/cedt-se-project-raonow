import ReviewForm from "@/components/ReviewForm"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/[...nextauth]";
import getReviews from "@/libs/getReviews";
import getBooking from "@/libs/getBooking";
import BookingHotelCard from "@/components/BookingHotelCard";
import ReviewCard from "@/components/ReviewCard";

export default async function ReviewBookingPage({params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions);
    if(!session) return null;

    const book = await getBooking(session.user.token, params.id);
    if (!book) return null;
    
    const booking = book.data;
    if (!booking.review) {
        return (
            <div className='w-screen'>
            <div className="container mx-auto py-4 w-2/3 space-y-4">
                <h1 className="text-2xl font-bold my-4">Share your experience!</h1>
                <BookingHotelCard hotel={booking.hotel} book={booking} cardType="showSingleBooking" isReview={true}/>
                <ReviewForm session={session} booking={booking._id} hotel={booking.hotel._id}/>
            </div>
            </div>
        )
    }
    const Review = await getReviews(
        { token: session?.user.token, hotel: booking.hotel._id, query: {'id': booking.review}});
    const review = Review.data.reviews;
    return (
        <div className="container mx-auto py-4 w-2/3 space-y-4 min-h-screen">
            <h1 className="text-2xl font-bold my-4">You have already reviewed this booking. This is your review.</h1>
            <BookingHotelCard hotel={booking.hotel} book={booking} cardType="showSingleBooking" isReview={true}/>
            <div className="pt-6"><ReviewCard review={review} cardType="createReview"/></div>
        </div>
    )
}
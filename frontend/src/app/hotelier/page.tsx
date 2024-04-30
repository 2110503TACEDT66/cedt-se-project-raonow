import getHotel from "@/libs/getHotel"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/[...nextauth]";
import getReviews from "@/libs/getReviews";
import ReviewPanel from "@/components/ReviewPanel";
import HotelierNotification from "@/components/HotelierNotification";
import getReviewHeader from "@/libs/getReviewHeader";

export default async function HotelierPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null;
  if (!['hotelier', 'admin'].includes(session.user.user.role)) return null;
  
  let hotelID = session.user.user.hotelier;
  if (session.user.user.role === 'admin' || !hotelID) {
    hotelID = '65e43ae76ab856889745475e';
  }
  
  const hotel = await getHotel(hotelID);
  if (!hotel) return null;
  // console.log(session);
  const reviewHeader = await getReviewHeader({ hotel: hotel.data._id }) 
  const reviews = await getReviews({ token: session?.user.token, hotel: hotel.data._id, query: {} });
  return (
    <main className="w-screen min-h-screen">
			<div className="container mx-auto py-4 w-2/3 space-y-4">
        <h1 className="text-2xl font-bold my-4">
          Welcome, Hotelier of {hotel.data.name}!
        </h1>
        <h3 className="text-sm text-gray-700">
          Hotel ID: {hotel.data._id}
        </h3>
        <ReviewPanel session={session} hotel={hotel.data} viewType="hotelier" header={reviewHeader} reviews={reviews}/>
      </div>
      <HotelierNotification token={session?.user.token} hotel={hotel.data._id}/>
		</main>
  )
}

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import getBooking from "@/libs/getBooking";
import CreateBookingForm from "@/components/CreateBookingForm"; 
import BookingHotelCard from "@/components/BookingHotelCard";
import { BookingItem } from "../../../../../interface";
import UpdateBookingForm from "@/components/UpdateBookingForm";

export default async function BookingPage({params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions);
    if(!session) return null;
    const book = await getBooking(session.user.token, params.id);
    const booking:BookingItem = book.data;
    console.log(booking);
    // console.log(params);
    const hotel = booking.hotel;

    let price = hotel.basePrice || 0;
    if (booking.roomType.includes("Suite")) {
        price += 600
        if (hotel.starRating == 5) {
            price += 400
            if (booking.roomType.includes("Executive")) {
                price += 1000
            }
        }
    }
    price *= booking.duration;
    const checkinDate = new Date(booking.bookDate).toLocaleDateString();
    const checkoutDate = new Date(new Date(booking.bookDate).getTime() + booking.duration * 24 * 60 * 60 * 1000).toLocaleDateString();

    return (
      <div className="bg-gray-100 min-h-screen">
      {/* <header className="sticky top-0 z-10 bg-teal-700 text-white px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-medium">{hotel.data.name}</h1>
          <p>Check-in: {checkinDate} - Check-out: {checkoutDate}</p>
      </header> */}
      <main className="container mx-auto px-4 py-4 w-2/3 space-y-4">
            <h2 className="text-xl font-medium mb-2">Welcome, {booking.user.name}!</h2>
            <BookingHotelCard hotel={hotel} book={booking} cardType="showBooking"/>

            <div className="border rounded-md flex flex-row justify-between py-4 px-6 shadow-lg bg-white">
                <div className='w-[60%]'>
                    <h3 className="font-medium mb-2">Guest information</h3>
                    <div className="grid grid-cols-2 justify-between">
                        <div>
                            <div className='text-xs'>Lead guest</div>
                            <div>{booking.user.name}</div>
                        </div><div>
                            <div className='text-xs'>Book capacity</div>
                            <div>2 adults</div>
                        </div>
                    </div>
                </div>
                <div className='w-[40%] space-y-2'>
                    <h3 className="font-medium">Payment information - PromptPay</h3>
                    <div className="flex justify-between">
                        <p>1 room x {booking.duration} night(s) </p>
                        <p>THB {price.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between font-medium">
                        <p>Total Charge:</p>
                        <p>THB {price.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <div className="border rounded-md p-4 shadow-lg mt-4 bg-white">
                <h3 className="font-medium mb-2">Modification and Cancellation Policy</h3>
                <p>
                    • Updating your reservation will incur a THB 300 fee. Updating date
                    of reservation with add on top THB 1000 fee.
                </p>
                <p>
                    • If you need to cancel your reservation, you will receive a refund
                    of 50% of the total booking cost.
                </p>
                <p>By proceeding with this booking, you agree to the policy</p>
            </div>
            <div className="flex justify-center">
                <UpdateBookingForm bookItem={booking} bookId={booking._id || ''} session={session}/>
            </div>
      </main>
  </div>
      )
}
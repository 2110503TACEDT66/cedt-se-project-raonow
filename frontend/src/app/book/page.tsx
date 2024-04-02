import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import getHotel from "@/libs/getHotel";
import { BookingItem } from "../../../interface";
import CreateBookingForm from "@/components/CreateBookingForm"; 
import BookingHotelCard from "@/components/BookingHotelCard";
import { HotelItem } from "../../../interface";

export default async function Book({searchParams}:{searchParams:{hotel:string, type:string, date:string, duration:number}}) {
    const session = await getServerSession(authOptions);
    const user = session? await getUserProfile(session.user?.token) : null;
    const hotel = await getHotel(searchParams.hotel);

    // console.log(user);
    // console.log(hotel);

    let price = hotel.data.basePrice;
    if (searchParams.type.includes("Suite")) {
        price += 600
        if (hotel.starRating == 5) {
            price += 400
            if (searchParams.type.includes("Executive")) {
                price += 1000
            }
        }
    }
    price *= searchParams.duration;
    const checkinDate = new Date(searchParams.date).toLocaleDateString();
    const checkoutDate = new Date(new Date(searchParams.date).getTime() + searchParams.duration * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    const book:BookingItem = {
        user: user.data,
        hotel: hotel.data,
        roomType: searchParams.type,
        duration: searchParams.duration || 0,
        bookDate: new Date(searchParams.date),
        createdAt: new Date()
    }

    return (
      <div className="bg-gray-100 min-h-screen">
      {/* <header className="sticky top-0 z-10 bg-teal-700 text-white px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-medium">{hotel.data.name}</h1>
          <p>Check-in: {checkinDate} - Check-out: {checkoutDate}</p>
      </header> */}
      <main className="container mx-auto px-4 py-4 w-2/3 space-y-4">
            <h2 className="text-xl font-medium mb-2">Welcome, {user.data.name}!</h2>
            <BookingHotelCard hotel={hotel.data} book={book} cardType="createBooking"/>

            <div className="border rounded-md flex flex-row justify-between py-4 px-6 shadow-lg bg-white">
                <div className='w-[60%]'>
                    <h3 className="font-medium mb-2">Guest information</h3>
                    <div className="grid grid-cols-2 justify-between">
                        <div>
                            <div className='text-xs'>Lead guest</div>
                            <div>{user.data.name}</div>
                        </div><div>
                            <div className='text-xs'>Book capacity</div>
                            <div>2 adults</div>
                        </div>
                    </div>
                </div>
                <div className='w-[40%] space-y-2'>
                    <h3 className="font-medium">Payment information - PromptPay</h3>
                    <div className="flex justify-between">
                        <p>1 room x {searchParams.duration} night(s) </p>
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
                <CreateBookingForm book={book} session={session}/>
            </div>
      </main>
  </div>
      )
}
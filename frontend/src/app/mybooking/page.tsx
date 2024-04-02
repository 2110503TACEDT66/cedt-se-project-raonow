import getBookings from '@/libs/getBookings';
import {BookingItem} from "../../../interface"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BookingHotelCard from '@/components/BookingHotelCard';
import Link from 'next/link';
import BookingCatalog from '@/components/ฺBookingCatalog';

export default async function myBooking(){
    const session = await getServerSession(authOptions);
    if(!session) return null;
    const bookings = await getBookings(session.user.token);
    console.log(bookings);
    
    return(
        <main className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
            <h1 className="text-2xl font-bold my-4">Your Bookings</h1>
           {bookings.data && bookings.data.length > 0 ? (
                bookings?.data.map((booking:BookingItem) => (
                    <BookingCatalog booking={booking}/>
                ))
            ) : (
                <p>No bookings found.</p>
            )}
            
        </main>
    )
}
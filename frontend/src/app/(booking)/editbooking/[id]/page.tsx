
import UpdateBookingForm from '@/components/UpdateBookingForm';
import getHotel from '@/libs/getHotel'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { BookingItem } from "../../../../../interface";
import getBooking from '@/libs/getBooking';

export default async function UpdateBook({params}: {params: {id: string}}) {
    const session = await getServerSession(authOptions);
    if(!session) return null;

    const booking = await getBooking(session.user.token, params.id);
    console.log(booking)
    return (
      <main className="w-full flex flex-col justify-center">
        <h1 className='mx-auto my-12 text-3xl font-sans font-bold
        text-stone-900'>
          Booking ID {params.id}
        </h1>
        <UpdateBookingForm bookItem={booking.data}  bookId={params.id} session={session} />
      </main>
    );
}
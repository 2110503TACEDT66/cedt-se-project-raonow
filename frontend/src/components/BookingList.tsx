'use client'
import Image from "next/image";
import Link from "next/link";
import { BookingItem } from "../../interface";
import { useRouter } from "next/navigation";
import deleteBooking from "@/libs/deleteBooking";
import {useState} from "react";
import { CircularProgress } from "@mui/material";

export default function BookingList({ booking, session }: { booking: BookingItem, session: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // console.log(booking);
    const handleDeleteBooking = async (id: string) => {
        console.log("hello")
        setIsLoading(true);
        try {
            const token = session?.user.token ?? '';
            await deleteBooking(token, id);
            console.log("delete booking success");
            router.refresh();
        } catch (error:any) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        
        <div className="bg-gray-200  flex flex-col items-center space-y-4 shadow-lg p-6 w-3/4 mx-auto border-black border">
        <div className="h-full w-[30%] relative">
                <Image src='/img/Standard.jpg'
                    alt='card image'
                    fill={true}
                    className='object-cover'/>
            </div>
        <div className="h-full w-[70%] p-[10px] text-left m-4">
            <div className="flex items-center space-x-4">
                <i className="fi fi-sr-building text-3xl"></i>
                <div className="text-xl font-semibold">Hotel: {booking.hotel.name}</div>
            </div>
            
            <div className="flex items-center space-x-4">
                <i className="fi fi-sr-calendar-day text-xl"></i>
                <div className="text-md font-semibold">Book Date: {booking.bookDate.toString()}</div>
            </div>
            <div className="flex items-center space-x-4">
                <i className="fi fi-sr-phone-call text-xl"></i>
                <div className="text-md font-semibold">Tel: {booking.hotel.telephoneNumber}</div>
            </div>
            <div className="flex items-center space-x-4">
                <i className="fi fi-sr-phone-call text-xl"></i>
                <div className="text-md font-semibold">Room Type: {booking.roomType}</div>
            </div>
            <div className="flex items-center space-x-4">
                <i className="fi fi-sr-phone-call text-xl"></i>
                <div className="text-md font-semibold">Duration: {booking.duration}</div>
            </div>
        </div>
        <div className="flex justify-center w-full space-x-4">
            <Link href={`/editbooking/${booking._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </button>
            </Link>
            {isLoading ? (
                <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <CircularProgress color="inherit" size={24} />
                </div>
            ) : (
                <button onClick={() => { handleDeleteBooking(booking._id as string); }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </button>
            )}
        </div>
    </div>
    
    );
}
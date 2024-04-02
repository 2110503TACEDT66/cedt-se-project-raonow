"use client"
import createBooking from "@/libs/createBooking";
import { BookingItem } from "../../interface"
import { Session } from "inspector";
import { useState, useEffect } from "react";
import getUserProfile from "@/libs/getUserProfile";
import { Select, MenuItem, ListItemIcon, CircularProgress } from "@mui/material";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import DateReserve from "@/components/DateReserve";
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function CreateBookingForm({book, session}:{book:BookingItem, session:any}) {
    const [modify, setModify] = useState(book.bookDate === null || book.duration < 1);
    const [isLoading, setIsLoading] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [bookDate, setBookDate] = useState<Dayjs | null>(book.bookDate ? dayjs(book.bookDate) : null);
    const [duration, setDuration] = useState<number | null>(book.duration || 1);
    // console.log(session?.user.token)
    const menuClass = "px-3 py-1 space-x-2";

    console.log(book)

    const router = useRouter();

    const linkUpdate = `/book/?hotel=${book.hotel._id}&type=${book.roomType}&date=${bookDate?.format('YYYY-MM-DD')}&duration=${duration}`;

    const handleCreateBooking = async () => {
        if ( !duration || !bookDate) return alert("Please select date and duration");
        setIsLoading(true);
        const eBookDate = bookDate.toDate();
        try {
            await createBooking(eBookDate, 
                book.hotel._id,
                duration, 
                book.roomType,
                session?.user.token,
                book.user._id)
            setIsComplete(true);
        } catch (error:any) {
            alert("Create booking failed");
        } finally {
            setIsLoading(false);
        }
    };

    if (modify) return (
        <div className='rounded-3xl flex flex-col items-center space-y-4 p-4'>
            <div className="h-screen/2 flex items-center justify-center">
            <form className='bg-gray-200 rounded-3xl flex flex-col items-center space-y-4 shadow p-6'>
                <div>Please specify booking date and duration</div>
                <div className='flex space-x-4'>
                    <DateReserve onDateChange={(value: Dayjs) => {setBookDate(value);}} current={bookDate}/>
                    <Select variant='standard' name='duration' id='duration' className='bg-white w-[100px] focus:outline-none focus:border-none' 
                        onChange={(event) => {setDuration(event.target.value as unknown as number);}} labelId="duration-label" 
                        defaultValue={duration || 1}
                    >
                        <MenuItem value={1}>
                            <ListItemIcon className={menuClass}>
                                <NightsStayIcon fontSize="small" style={{ marginRight: '8px' }} />1
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={2}>
                            <ListItemIcon className={menuClass}>
                                <NightsStayIcon fontSize="small" style={{ marginRight: '8px' }} />2
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem value={3}>
                            <ListItemIcon className={menuClass}>
                                <NightsStayIcon fontSize="small" style={{ marginRight: '8px' }} />3
                            </ListItemIcon>
                        </MenuItem>
                    </Select>
                    {(duration !== null && bookDate !== null) ? (
                        <Link href={linkUpdate}>
                        <button type='submit' onClick={(event)=> {
                            setModify(false);}}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 text-lg
                            rounded items-center space-x-2 h-full'
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : "UPDATE"}
                        </button>
                        </Link>
                    ) : (
                        <button type='submit' onClick={(event)=> {
                            event.preventDefault();}}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 
                            rounded flex items-center space-x-2 h-full'
                            disabled
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Update"}
                        </button>
                    )}
                </div>
            </form>
        </div>
        </div>
    );

    if (isComplete) return (
        <div className="flex flex-col text-center font-bold text-green-600 mt-4 text-xl">
            <div>Booking complete!</div>
            <div>Thank you for booking with us!</div>
            <div className="flex justify-between space-x-6 mt-4 text-white font-medium">
                <Link href="/"><button type='button'
                    className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8         
                    rounded flex items-center space-x-2'>Back home</button></Link>                       
                <Link href="/mybooking"><button type='button'
                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8
                    rounded flex items-center space-x-2'>View booking</button></Link>
            </div>
        </div>
    );
    
    if (isLoading) 
        return (
        <div className="flex justify-center items-center w-full mt-4">
            <CircularProgress size={30} color="inherit" />
        </div>
    );

    return (
        <div className="flex justify-between space-x-6 mt-2 w-full text-lg">
            <button type='submit' onClick={(event)=> {
                setModify(true);}}
                className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-16 
                rounded flex justify-center text-center w-1/3 shadow-lg'
            >Modify Booking</button>
            <button type='submit' onClick={(event)=> {
                event.preventDefault(); handleCreateBooking();}}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-16 
                rounded flex justify-center text-center space-x-2 w-2/3 shadow-lg'
            >BOOK NOW
            </button>
        </div>
    )
}
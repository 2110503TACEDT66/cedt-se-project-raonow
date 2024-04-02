'use client'
import DateReserve from './DateReserve';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { BookingItem } from '../../interface';
import updateBooking from '@/libs/updateBooking';
import deleteBooking from '@/libs/deleteBooking';
import { Select, MenuItem, ListItemIcon, CircularProgress } from "@mui/material";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useRouter } from 'next/navigation';

export default function UpdateBookingForm({ bookItem, bookId, session }: 
    { bookItem:BookingItem, bookId: string, session: any }) {
    const router = useRouter();
    const [bookDate, setBookDate] = useState<Dayjs>(dayjs(bookItem.bookDate));
    const [duration, setDuration] = useState<number>(bookItem.duration);
    const [isLoading, setIsLoading] = useState(false);

    const menuClass = "px-3 py-1 space-x-2";

    const handleUpdateBooking = async () => {
        if (!bookId || !duration || !bookDate) return;

        setIsLoading(true); // Start loading animation
        
        try {
            const eBookDate = bookDate.toDate();        
            await updateBooking(eBookDate, duration, session.user.token, bookId);
            console.log("updateBooking success");
            alert("Booking updated successfully");
        } catch (error) {
            console.error("Error update booking:", error);
        } finally {
            setIsLoading(false); // Stop loading animation
        }
    };

    const handleDeleteBooking = async () => {
        console.log("hello")
        setIsLoading(true);
        try {
            const token = session.user.token;
            await deleteBooking(token, bookId);
            console.log("delete booking success");
            router.push('/mybooking');
        } catch (error:any) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='rounded-3xl flex flex-col items-center space-y-4 p-6'>
            <div className="h-screen/2 flex items-center justify-center">
            <form className='bg-gray-200 rounded-3xl flex flex-col items-center space-y-4 shadow p-6'>
                <div className='flex space-x-4'>
                    <DateReserve onDateChange={(value: Dayjs) => setBookDate(value)} current={bookDate}/>
                    <Select variant='standard' name='duration' id='duration' className='bg-white w-[100px] focus:outline-none focus:border-none' 
                        onChange={(event) => setDuration(event.target.value as unknown as number)} labelId="duration-label" 
                        defaultValue={duration}
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
                </div>
                <div className='mx-auto'>
                    {isLoading ?
                        <CircularProgress size={24} color="inherit" /> :
                    <div className='flex justify-between space-x-6 mt-2 w-full'>
                    <button type='submit' onClick={(event) => {handleUpdateBooking();}}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded flex items-center space-x-2'
                    >Edit</button>
                    <button type='submit' onClick={(event) => {handleDeleteBooking();}}
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 rounded flex items-center space-x-2'
                    >Delete</button>
                    </div>
                    }
                    
                </div>
            </form>
        </div>
        </div>
    );
}

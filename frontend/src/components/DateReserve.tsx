"use client"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

export default function DateReserve({onDateChange, current}:{onDateChange: Function, current?:Dayjs|null}) {

    const [reserveDate, setReserveDate] = useState<Dayjs|null>(current || null);

    return (
        <div className="bg-white rounded-lg justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white w-[280px]" 
                value={reserveDate} onChange={(value)=>{ setReserveDate(value); onDateChange(value) }}
                disablePast/>
            </LocalizationProvider>
        </div>
    )
}
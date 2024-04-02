"use client"
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Select, MenuItem, CircularProgress, ListItemIcon, Autocomplete, TextField } from "@mui/material";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PersonIcon from '@mui/icons-material/Person';
import DateReserve from "./DateReserve";

export default function AddBookDate(searchParams:any) {
    const options = [
        { label: 'Anywhere', value: 'Anywhere' },
        { label: 'Bangkok', value: 'Bangkok' },
        { label: 'Chiang Mai', value: 'Chiang Mai' },
        { label: 'Phuket', value: 'Phuket'}
    ]
    const [destination, setDestination] = useState<string>(searchParams.address || 'Anywhere');
    const [reserveDate, setReserveDate] = useState<Dayjs|null>(null);
    const [duration, setDuration] = useState<number>(1);
    const [isLoading, setIsLoading] = useState(false);
    const menuClass = "px-3 py-1 space-x-2";

    const router = useRouter();

    const handleSearch = () => {
        setIsLoading(true);
        const params = new URLSearchParams({
            address: destination,
            duration: String(duration), 
            date: reserveDate ? reserveDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD') 
        });

        if (destination === 'Anywhere') {
            params.delete('address');
        }
        router.push(`/hotels?${params.toString()}`);
        setIsLoading(false);
    };


    return (
        <div className=" bg-gray-200 flex flex-col items-center space-y-4 shadow w-screen">
            <div className="flex space-x-4 py-3">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    // defaultValue={searchParams.address || 'Anywhere'}
                    options={options}
                    sx={{ width: 300 }}
                    onChange={(event:React.SyntheticEvent<Element, Event>, value:any) => setDestination(value?.value || '')}
                    renderInput={(params) => <TextField {...params} label="Enter a destination" 
                    className="bg-white"
                    />}
                />
                <DateReserve onDateChange={(value:Dayjs)=>{setReserveDate(value)}}/>
                <Select variant='standard' name='duration' id='duration' className='bg-white w-[100px] focus:outline-none focus:border-none' 
                onChange={(event)=>{setDuration(event.target.value as unknown as number)}} labelId="duration-label" defaultValue={searchParams.duration || 1}
                >
                    <MenuItem value={1}><ListItemIcon className={menuClass}><NightsStayIcon fontSize="small" style={{ marginRight: '8px' }}/>1</ListItemIcon></MenuItem>
                    <MenuItem value={2}><ListItemIcon className={menuClass}><NightsStayIcon fontSize="small" style={{ marginRight: '8px' }}/>2</ListItemIcon></MenuItem>
                    <MenuItem value={3}><ListItemIcon className={menuClass}><NightsStayIcon fontSize="small" style={{ marginRight: '8px' }}/>3</ListItemIcon></MenuItem>
                </Select>
                <Select variant='standard' name='guests' id='guests' className='bg-white' disabled defaultValue={1}>
                    <MenuItem value={1} className={`${menuClass} items-center justify-center py-1`}>
                        <ListItemIcon className={menuClass}><PersonIcon fontSize="small" style={{ marginRight: '8px' }}/>2 adults, 1 room</ListItemIcon>
                    </MenuItem>
                </Select>

                {isLoading ? (
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                    py-2 px-4 w-72 text-base rounded-full shadow"><CircularProgress size={24}/></div>
                ) : 
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold 
                    py-2 px-4 w-72 text-base rounded-full shadow" onClick={handleSearch}>SEARCH</button>
                }

            </div>
        </div>
    )
}
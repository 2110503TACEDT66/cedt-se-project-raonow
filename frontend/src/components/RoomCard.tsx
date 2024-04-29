import Image from 'next/image'
import Link from 'next/link';
import { BedOutlined, SellOutlined } from '@mui/icons-material';

export default function RoomCard({roomType, imgSrc, bed, cap, shower, smoke, price, book}:
    {roomType:string, imgSrc:string, bed:string, cap?:number, shower?:boolean, smoke?:boolean, price:number, 
        book:{hotel:string, date:string, duration:number}}) {
    
    return(
        <div className='w-[90%] h-[200px] flex flex-row bg-slate-100 
        rounded-md hover:bg-slate-200'>
            <div className="h-full w-[30%] relative">
                <Image src={imgSrc}
                    alt='card image'
                    fill={true}
                    className='object-cover rounded-tl-md rounded-bl-md'/>
            </div>
            <div className="h-full w-[70%] p-[10px] text-left m-4 my-2">
                <div className='text-2xl font-semibold'>{roomType}</div>
                <div className='flex flex-row mx-2 justify-between my-8'>
                    <div className='text-lg flex flex-row space-x-2 items-center'>
                        <BedOutlined style={{width: '24px', height: '24px'}}/>
                        <p>{bed}</p>
                    </div>
            
                    <div className='text-center space-y-2'>
                        <div className='flex flex-row space-x-2 items-center text-slate-600'>
                            <SellOutlined style={{width: '20', height: '20px'}}/>
                            <p>Price per night</p>
                        </div>
                        <div className='text-red-600 text-xl'>THB {price}</div>
                    </div>
                    
                    <div className='text-center'>
                    <Link href={`/book?hotel=${book.hotel}&type=${roomType}&date=${book.date}&duration=${book.duration}`}>
                        <button className="block rounded-md bg-blue-500 hover:bg-indigo-500 px-10 py-2 
                            text-white shadow-sm">Book Now</button> </Link>
                    </div>
                    
                    
                </div>
            </div>
            
        </div>
    )
}
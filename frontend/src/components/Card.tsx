import Image from 'next/image'
import InteractiveCard from './InteractiveCard'
import StarRating from './StarRating';
import { HotelItem, HotelImage, BookingItem, UserBookingInfo } from '../../interface';
import ImageComponent from './ImageComponent';
import { styled } from '@mui/system';
import calculateRoomPrice from '@/libs/calculateRoomPrice';
import dayjs from 'dayjs';

export default function Card({hotelName, book, user, cardType}:
    {hotelName:HotelItem, book?:BookingItem, user?:UserBookingInfo, cardType?:string}) {
        const hotel = hotelName
        const img = hotel.images
        const pic = img?.main
        let showPrice = hotel.basePrice
        console.log(img)
        console.log("pic: " + pic)
        console.log(book?.roomType);

    const roomTypeImages: { [key: string]: string } = {
        'Standard': '/img/Standard.jpg',
        'Superior': '/img/Superior.jpg',
        'Deluxe': '/img/Deluxe.jpg',
        'Suite': '/img/Suite.jpg',
        'Executive Suite': '/img/ExSuite.jpg'
    };

        //"/img/Standard.jpg"
    if (cardType === 'createBooking' || cardType === 'showBooking') {
        return (
            <InteractiveCard cardType={cardType}>
            <div className="h-full w-[30%] relative">
                <Image src={pic || '/img/Standard.jpg'}
                    alt='card image'
                    fill={true}
                    className='object-cover rounded-l-lg'/>
            </div>

            <div className="w-[70%] text-left m-6">
                {/* top part - hotel name & rating */}
                <div className='text-2xl font-semibold space-y-2'>
                    <div>{hotel.name}</div>
                    <StarRating className='h-[10%]' readOnly value={hotel.starRating}/>
                </div>

                {/* down part */}
                <div className='flex flex-row justify-between'>
                    <div className='w-[50%] space-y-2'>
                        <div className='grid grid-cols-2 justify-between'>
                            <div>
                                <div className='font-bold'>Check-in</div>
                                <div>{dayjs(book?.bookDate).format('ddd, DD/MM/YYYY')}</div>
                            </div><div>
                                <div className='font-bold'>Check-out</div>
                                <div>{dayjs(book?.bookDate).add(book?.duration || 0, 'day').format('ddd, DD/MM/YYYY')}</div>
                            </div>
                        </div>
                        {
                        cardType === 'showBooking' ? (
                            <div className='text-base font-bold'>Guest: {book?.user.name}</div>
                        ) : (
                            <p className='text-gray-600'>Hotel phone: {hotel.telephoneNumber}</p>
                        )
                        }
                        
                    </div>
                    <div className='w-[50%] flex flex-row space-x-4'>
                        <div className="h-full w-[30%] relative">
                            <Image src={roomTypeImages[book?.roomType || 'Standard']}
                            alt='card image'
                            fill={true}
                            className='object-cover rounded-md'/>
                        </div>
                        <div className='justify-between'>
                            <div className='font-bold'>Room Information</div>
                            <div>1 X {book?.roomType} Room</div>
                        </div>
                    </div>
                </div>
                {
                    cardType === 'showBooking' && (
                        <div className="">
                            <div className="text-gray-500">Booking ID: {book?._id}</div>
                            <div className="text-gray-400">Click to view or edit booking information</div>
                        </div>
                    )
                }
            </div>
            
        </InteractiveCard>
        )
    }

    return(
        <InteractiveCard cardType={cardType}>
            <div className="h-full w-[30%] relative">
                <Image src={pic || '/img/Standard.jpg'}
                    alt='card image'
                    fill={true}
                    className='object-cover rounded-l-lg'/>
            </div>

            <div className="h-full w-[70%] p-[10px] text-left m-4">
                <div className='text-2xl font-semibold'>{hotel.name}</div>

                <div className='flex flex-row m-4 justify-between'>
                    <div className='w-[70%]'>
                        <StarRating className='h-[10%]' readOnly value={hotel.starRating}/>
                        <p className='text-sky-600'>{hotel.address}</p>
                    </div>

                    <div className='w-[30%]'>
                        <div className=''>Start form</div>
                        <div className='text-red-600 text-lg'>THB {showPrice}</div>
                    </div>
                </div>
            </div>
            
        </InteractiveCard>
    )
}
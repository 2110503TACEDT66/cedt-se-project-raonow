import { ReviewItem } from "../../interface";
import { Rating } from "@mui/material";
import { reviewStar } from "../../interface";
import ReactCountryFlag from "react-country-flag"
import { CardTravelOutlined, BedOutlined, CalendarMonthOutlined, ReviewsOutlined } from "@mui/icons-material";
import dayjs from 'dayjs';

export default function ReviewCard({review, cardType}:{review:ReviewItem, cardType: string}) {
	// console.log(JSON.stringify(review));
	if (!review.attitude) review.attitude = 'neutral';
	const attitude = review.attitude.charAt(0).toUpperCase() + review.attitude.slice(1) + ' review';
  return (
		<div className="w-full min-h-32 flex flex-row justify-between">
			{/* left part: rating & information */}
			<div className="w-[22%] flex flex-col space-y-0.5 py-2 text-gray-600">
				<div className="flex flex-row space-x-2 w-full text-blue-600">
					<h1 className="text-3xl font-semibold">{review.rating.toFixed(1)}</h1>
					<h3 className="flex items-end justify-end text-end">{reviewStar[review.rating]}</h3>
				</div>
				<div><Rating name="rating" max={5} precision={0.5} value={review.rating} readOnly/></div>

				{/* <div className="flex flex-row space-x-2 w-full pt-1">
					<ReactCountryFlag countryCode="TH" svg style={{width: '20px', height: '20px'}} aria-label="Flag" />
					<p className="text-sm">
						<span className="font-medium">{review.user.name.split(' ')[0]}</span> from Thailand
					</p>
				</div> */}
				{ review.attitude === 'positive' ? 
					<div className="flex flex-row space-x-2 w-full text-sm">
						<ReviewsOutlined style={{width: '20px', height: '20px', color: 'green'}} />
						<p className="text-green-600">{attitude}</p>:
					</div> :
					<div className="flex flex-row space-x-2 w-full text-sm">
						<ReviewsOutlined style={{width: '20px', height: '20px'}} />
						<p className="">{attitude}</p>
					</div>
				}
				

				<div className="flex flex-row space-x-2 w-full text-sm">
					<CardTravelOutlined style={{width: '20px', height: '20px'}}/>
					<p className="">{review.travelerType.charAt(0).toUpperCase() + review.travelerType.slice(1)} traveler</p>
				</div>
				<div className="flex flex-row space-x-2 w-full text-sm">
					<BedOutlined style={{width: '20px', height: '20px'}}/>
					<p className="">{review.booking.roomType} Room</p>
				</div>
				<div className="flex flex-row space-x-2 w-full text-sm">
					<CalendarMonthOutlined style={{width: '20px', height: '20px'}}/>
					<p className="">Stayed {review.booking.duration} nights in {dayjs(review.booking.bookDate).format('MMMM YYYY')}</p>
				</div>
			</div>

			{/* right part: review card */}
			<div className="w-[75%] rounded-lg bg-gray-100 flex flex-col p-6 space-y-2 justify-between">
				<div className="flex flex-col space-y-2"> 
					<div className="text-lg font-semibold">"{review.title}"</div>
					<p className="">{review.review}</p>
				</div>
				<p className="text-gray-400 text-sm justify-end">
					Reviewed {dayjs(review.createdAt).format('MMMM DD, YYYY')}
				</p>
			</div> 
		</div>
	);
}


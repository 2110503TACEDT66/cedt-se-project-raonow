import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import StarRating from "./StarRating";
import {
  HotelItem,
  HotelImage,
  BookingItem,
  UserBookingInfo,
} from "../../interface";
import { PlaceOutlined } from "@mui/icons-material";
import dayjs from "dayjs";
import Link from "next/link";
import ImageDefault from "./ImageDefault";

export default function Card({
  hotelName,
  book,
  user,
  cardType,
  isReview,
}: {
  hotelName: HotelItem;
  book?: BookingItem;
  user?: UserBookingInfo;
  cardType?: string;
  isReview?: boolean;
}) {
  const hotel = hotelName;
  const img = hotel.images;
  // const pic = 'https://drive.google.com/uc?id=1IJ7dEhuc3jwdh3PfvEVgH8_sX_kAJu-5'
  const pic = img?.main;
  let showPrice = hotel.basePrice;
  // console.log(img)
  // console.log("pic: " + pic)
  // console.log(book?.roomType);

  const roomTypeImages: { [key: string]: string } = {
    Standard: "/img/Standard.jpg",
    Superior: "/img/Superior.jpg",
    Deluxe: "/img/Deluxe.jpg",
    Suite: "/img/Suite.jpg",
    "Executive Suite": "/img/ExSuite.jpg",
  };
  const isShowBooking =
    cardType === "showBooking" || cardType === "showSingleBooking";
  const showReviewButton =
    dayjs(book?.createdAt) <= dayjs().add(1, "day") &&
    !isReview &&
    !book?.review;
  const showViewReviewButton = book?.review && !isReview;

  //"/img/Standard.jpg"
  if (cardType === "createBooking" || isShowBooking) {
    return (
      <InteractiveCard cardType={cardType}>
        <div className="h-full w-[30%] relative">
          <Image
            src={pic || "/img/Standard.jpg"}
            alt="card image"
            fill={true}
            className="object-cover rounded-l-lg"
          />
        </div>

        <div className="w-[70%] text-left m-6">
          {/* top part - hotel name & rating */}
          <div className="text-2xl font-semibold space-y-2">
            <div>{hotel.name}</div>
            <StarRating className="h-[10%]" readOnly value={hotel.starRating} />
          </div>

          {/* down part */}
          <div className="flex flex-row justify-between">
            <div className="w-[50%] space-y-2">
              <div className="grid grid-cols-2 justify-between">
                <div>
                  <div className="font-bold">Check-in</div>
                  <div>{dayjs(book?.bookDate).format("ddd, DD/MM/YYYY")}</div>
                </div>
                <div>
                  <div className="font-bold">Check-out</div>
                  <div>
                    {dayjs(book?.bookDate)
                      .add(book?.duration || 0, "day")
                      .format("ddd, DD/MM/YYYY")}
                  </div>
                </div>
              </div>
              {cardType === "showBooking" ||
              cardType === "showSingleBooking" ? (
                <div className="text-base font-bold">
                  Guest: {book?.user.name}
                </div>
              ) : (
                <p className="text-gray-600">
                  Hotel phone: {hotel.telephoneNumber}
                </p>
              )}
            </div>
            <div className="w-[50%] flex flex-row space-x-4">
              <div className="h-full w-[30%] relative">
                <Image
                  src={roomTypeImages[book?.roomType || "Standard"]}
                  alt="card image"
                  fill={true}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="justify-between">
                <div className="font-bold">Room Information</div>
                <div>1 X {book?.roomType} Room</div>
              </div>
            </div>
          </div>
          {isShowBooking && (
            <div className="">
              <div className=" flex flex-row justify-between items-center">
                <div>
                  <div className="text-gray-500">Booking ID: {book?._id}</div>
                  <div className="text-gray-400">
                    Click to view or edit booking information
                  </div>
                </div>
                <div>
                  {book?.pointEarned != null ? (
                    <div className="items-center text-green-500">
                      {book?.pointEarned} point earned
                    </div>
                  ) : null}
                  {showReviewButton ? (
                    <div className="flex">
                      <Link href={`/booking/${book?._id}/review`}>
                        <button
                          type="submit"
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-16 
                                        rounded flex justify-center text-center w-2/3 shadow-lg"
                        >
                          Review
                        </button>
                      </Link>
                    </div>
                  ) : null}
                  {showViewReviewButton ? (
                    <div className="flex">
                      <Link href={`/booking/${book?._id}/review`}>
                        <button
                          type="submit"
                          className="border-2 hover:bg-slate-200 py-1 px-16 rounded flex justify-center text-center"
                        >
                          View Review
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </InteractiveCard>
    );
  }

  return (
    <InteractiveCard cardType={cardType}>
      <div className="h-full w-[30%] relative">
        <ImageDefault
          src={pic || "/img/Standard.jpg"}
          alt="card image"
          fill={true}
          className="object-cover rounded-l-lg"
          fallbackSrc="/img/cover.jpg"
        />
      </div>

      <div className="h-full w-[70%] p-[10px] text-left m-4">
        <div className="text-2xl font-semibold">{hotel.name}</div>

        <div className="flex flex-row m-4 justify-between">
          <div className="w-[70%]">
            <StarRating className="h-[10%]" readOnly value={hotel.starRating} />
            <p className="text-sky-600">{hotel.address}</p>
          </div>

          <div className="w-[30%]">
            <div className="">Start form</div>
            <div className="text-red-600 text-lg">THB {showPrice}</div>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}

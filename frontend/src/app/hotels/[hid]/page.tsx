'use server'
import Image from "next/image";
import getHotel from "@/libs/getHotel";
import RoomCard from "@/components/RoomCard";
import StarRating from "@/components/StarRating";
import getReviewHeader from "@/libs/getReviewHeader";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/[...nextauth]";
import { PlaceOutlined, PhoneOutlined } from "@mui/icons-material";
import ReviewHolder from "@/components/ReviewHolder";

export default async function HotelDetail({
  params,
  searchParams,
}: {
  params: { hid: string };
  searchParams: { date: string; duration: number };
}) {
  const session = await getServerSession(authOptions);
  const hotel = await getHotel(params.hid);
  if (!hotel) return null;
  const reviewHeader = await getReviewHeader({ hotel: params.hid});
  const hotelItem = hotel.data;

  let roomCount = 1;
  switch (hotelItem.starRating) {
    case 3:
      roomCount = 3;
      break;
    case 4:
      roomCount = 3;
      break;
    case 5:
      roomCount = 4;
      break;
  }

  const bookingInformation = {
    hotel: hotelItem._id,
    date: searchParams.date,
    duration: searchParams.duration,
  };

  return (
    <main className="w-screen">
    <div className="container mx-auto py-4 w-3/4 space-y-4">
      <div className="flex flex-col space-y-4 border-b-2">
        <div className="flex flex-row space-x-4">
          <div className="h-[405px] w-2/3">
          <Image
            src={hotelItem.images?.main || "/img/cover.jpg"}
            alt="Hotel Main Image"
            width={720}
            height={405}
            blurDataURL="/img/cover.jpg"
            
            sizes="75vw"
            className="object-cover rounded-md w-full h-full"
          />
          </div>
          <div className="flex flex-col space-y-4 w-1/3 h-[405px]">
            <div className="h-[48%]">
              <Image
                src={hotelItem.images?.des1 || "/img/Standard.jpg"}
                alt="Hotel description 1"
                width={480}
                height={196}
                sizes="50vw"
                className="object-cover rounded-md w-full h-full"
              />
            </div>
            <div className="h-[48%]">
              <Image
                src={hotelItem.images?.des2 || "/img/Deluxe.JPG"}
                alt="Hotel description 2"
                width={480}
                height={196}
                sizes="50vw"
                className="object-cover rounded-md w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="my-4 flex flex-row text-4xl font-semibold space-x-3 items-center">
          <p>{hotelItem.name}</p>
          <StarRating name="rating" value={hotelItem.starRating} readOnly className="items-center"/>
        </div>

        <div className="flex flex-col my-4 pb-4 space-y-1 text-md text-left">
          <div className="flex flex-row space-x-2 items-center">
            <PlaceOutlined style={{width: '20px', height: '20px'}}/>
            <p>{hotelItem.address}</p>
          </div>
          <div className="flex flex-row space-x-2 items-center">
            <PhoneOutlined style={{width: '20px', height: '20px'}}/>
            <p>{hotelItem.telephoneNumber}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">
          Select your room - {roomCount} room types available
      </h2>

      <div className="mx-[10%] pb-4 w-[90%] space-y-4">
        {hotelItem.starRating < 4 ? (
          <RoomCard
            roomType="Standard"
            bed={"2 Single Bed"}
            imgSrc={"/img/Standard.jpg"}
            price={hotelItem.basePrice}
            book={bookingInformation}
          />
        ) : null}
        {hotelItem.starRating > 2 ? (
          <div className="space-y-4">
            <RoomCard
              roomType="Superior"
              bed={"1 Double Bed"}
              imgSrc={"/img/Superior.jpg"}
              price={hotelItem.basePrice}
              book={bookingInformation}
            />
            <RoomCard
              roomType="Deluxe"
              bed={"1 Double Bed"}
              imgSrc={"/img/Deluxe.JPG"}
              price={hotelItem.basePrice}
              book={bookingInformation}
            />
          </div>
        ) : null}

        {hotelItem.starRating > 4 ? (
          <RoomCard
            roomType="Suite"
            bed={"1 Double Bed"}
            imgSrc={"/img/Suite.jpg"}
            price={hotelItem.basePrice + 600}
            book={bookingInformation}
          />
        ) : null}
        {hotelItem.starRating == 5 ? (
          <RoomCard
            roomType="Executive Suite"
            bed={"1 Double Bed"}
            imgSrc={"/img/ExSuite.jpg"}
            price={hotelItem.basePrice + 2000}
            book={bookingInformation}
          />
        ) : null}
      </div>
      {
        session ? 
        <div className="container mx-auto py-4 space-y-4 border-t-2">
          <ReviewHolder session={session} hotel={hotelItem} header={reviewHeader}/>
        </div> :
        <div className="container mx-auto py-4 space-y-4 justify-center border-t-2">
          Sign-in to view reviews
        </div>
      }
    {/* <ReviewHeaderListWithSuspense session={session} hotel={hotelItem._id}/> */}
    </div>
    </main>
  );
}
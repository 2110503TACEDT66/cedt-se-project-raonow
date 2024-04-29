import Image from "next/image";
import getHotel from "@/libs/getHotel";
import RoomCard from "@/components/RoomCard";
import EditHotelButton from "@/components/EditHotelButton";
import StarRating from "@/components/StarRating";
import ReviewPanel from "@/components/ReviewPanel";
import getReviews from "@/libs/getReviews";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/[...nextauth]";

export default async function HotelDetail({
  params,
  searchParams,
}: {
  params: { hid: string };
  searchParams: { date: string; duration: number };
}) {
  const session = await getServerSession(authOptions);
  const hotel = await getHotel(params.hid);
  const reviewHeader = await getReviews({ token: session?.user.token, hotel: hotel.data._id, query: { header: 1 } });
  const reviews = await getReviews({ token: session?.user.token, hotel: hotel.data._id, query: {} });
  const hotelItem = hotel.data;
  const img = hotelItem.images;
  const pic = img?.main;
  const bookingInformation = {
    hotel: hotelItem._id,
    date: searchParams.date,
    duration: searchParams.duration,
  };

  return (
    <main className="items-center w-screen">
      <div className="w-[90%] mx-[5%]">
        <Image
          src={pic}
          alt="Image"
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-md w-[100%]"
        />
        <div className="py-2 text-4xl font-semibold mx-2">
          {hotelItem.name}
          <StarRating name="rating" value={hotelItem.starRating} readOnly />
        </div>

        <div className="flex flexrow my-3 mx-2">
          <div className="text-md flex flex-col text-left">
            <div>{hotelItem.address}</div>
            {hotelItem.telephoneNumber}
          </div>
        </div>
      </div>

      <div className="py-6 mx-[10%] w-[90%]">
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
          <div>
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
              imgSrc={"/img/Deluxe.jpg"}
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

      <div className="container mx-auto py-4 w-2/3 space-y-4">
        <ReviewPanel session={session} hotel={hotelItem} viewType="user" header={reviewHeader} reviews={reviews}/>
      </div>
    </main>
  );
}

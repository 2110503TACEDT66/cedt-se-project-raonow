import Card from "./Card";
import { HotelJSON } from "../../interface";
import { useRouter } from "next/navigation";
import BookingHotelCard from "./BookingHotelCard";
import Link from "next/link";
import { BookingItem } from "../../interface";

export default async function BookingCatalog({booking}:{booking:BookingItem}) {
    return(
        <div>
            <Link href={`/booking/${booking._id}`}>
                <BookingHotelCard hotel={booking.hotel} book={booking} cardType="showBooking"/>
            </Link>
        </div>
    )
}

//"/img/Standard"
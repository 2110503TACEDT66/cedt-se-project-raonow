'use client'
import { BookingItem, HotelItem } from "../../interface";
import Card from "./Card";

export default function BookingHotelCard({hotel, book, cardType}:
    {hotel:HotelItem, book:BookingItem, cardType:string}) {

    return (
        <Card hotelName={hotel} book={book} cardType={cardType}/>
    )
}
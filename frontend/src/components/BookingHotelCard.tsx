'use client'
import { BookingItem, HotelItem } from "../../interface";
import Card from "./Card";

export default function BookingHotelCard({hotel, book, cardType, isReview}:
    {hotel:HotelItem, book:BookingItem, cardType:string, isReview?:boolean}) {

    return (
        <Card hotelName={hotel} book={book} cardType={cardType} isReview={isReview}/>
    )
}
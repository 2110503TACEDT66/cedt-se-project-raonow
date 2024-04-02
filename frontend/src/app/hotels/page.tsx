'use client'
import { Suspense } from "react"
import HotelCatalog from "@/components/HotelCatalog"
import { HotelJSON } from "../../../interface"
import getHotels from "@/libs/getHotels"
import LinearProgress from '@mui/material/LinearProgress';
import AddBookDate from "@/components/AddBookDate"

type Props = {
    params: {};
    searchParams: { [key: string]: string | string[] | undefined };
  };  

export default async function HotelsPage(props: Props) {
    const searchParams = props.searchParams;
    const hotels:HotelJSON = await getHotels(searchParams)
    
    return(
        <main className="w-screen">
            <AddBookDate searchParams={searchParams}/>
            <HotelCatalog hotelJson={hotels} date={searchParams.date as string} duration={Number(searchParams.duration)} />
        </main>
    )
}
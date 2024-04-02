import Card from "./Card";
import Link from "next/link";
import { HotelJSON } from "../../interface";
import { useRouter } from "next/navigation";
import { HotelItem } from "../../interface";

export default async function HotelCatalog({hotelJson, date, duration}
    :{hotelJson:HotelJSON, date:string, duration:number}) {
    const hotel = await hotelJson
    //console.log(hotel)

    return(
        <div style={{
            margin: "20px",
            display: "flex",
            flexDirection:"column",
            flexWrap:"wrap",
            justifyContent:"center",
            alignContent:"space-around"
        }}>
            {
                hotel.data.map((item) => (
                    <Link href={`/hotels/${item._id}?date=${date}&duration=${duration}`} className="w-full py-4">
                    <Card hotelName={item}/>
                    </Link>
                ))
            }
        </div>
    )
}

//"/img/Standard"
//<Card hotelName={item.name} imgSrc={item.images.main? item.images.main:"/img/Standard"}
//address={item.address} tel={item.telephoneNumber}
//rating={item.starRating} price={item.basePrice}/>
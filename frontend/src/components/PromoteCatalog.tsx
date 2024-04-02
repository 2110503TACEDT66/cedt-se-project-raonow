import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";

export default function PromoteCatalog({name, image, link}: {name: string, image: string, link: string}) {
    return (
        <div className="w-1/3 px-10">
            <div className="w-full h-[70%] relative rounded-t-lg flex items-center justify-center">
            <div style={{ width: 400, height: 300 }}>
                <Link href={`/hotels?address=${link}&date=${dayjs(new Date).format('YYYY-MM-DD')}&duration=1`}><Image
                    src={image}
                    alt="Product Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                /></Link>
                </div>
            </div>
            <div className="text-center py-8 text-xl font-semibold">{name}</div>
      </div>
    )
}
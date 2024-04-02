import Image from "next/image";
import BannerSearch from "./BannerSearch";

export default function Banner() {
    return (
        <div className="relative flex flex-col h-[80vh] w-screen items-center justify-center text-center text-white text-4xl font-bold z-0">
            <Image src="/img/cover.jpg"
            alt='cover'
            fill={true}
            priority
            style={{objectFit:"cover", maxHeight: "80vh"}}
            className="opacity-30"/>
            <div className="absolute top-10 text-center text-black">
                <h1 className="text-2xl font-semibold">BOOK A HOTEL NOW</h1>
                <h3 className="text-lg font-semibold pb-4">Your perfect stay, just a click away</h3>
                <BannerSearch />
            </div>
        </div>
    );
}
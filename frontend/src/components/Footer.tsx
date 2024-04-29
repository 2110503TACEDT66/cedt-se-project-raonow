import Link from "next/link";

export default async function Footer () {
    return (
        <div className="h-24 bg-gray-700 bottom-0 left-0 right-0 w-screen
        flex flex-col space-y-1 justify-center text-white text-center">
            <a>Hotel Booking Website by Rao Now</a>
            <a>This is a part of 2110423 Software Engineering Project</a>
        </div>
    )
}
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function TopMenu () {
    const session = await getServerSession(authOptions);
    return (
        <div className="h-16 bg-white top-0 left-0 right-0 border-t 
        border-solid border-lightgray flex flex-row justify-between text-black">
            <div className="flex items-center justify-center">
                <div className="text-md font-medium"><TopMenuItem title="Hotel Booking" pageRef="/"/></div>
                <TopMenuItem title="Hotels" pageRef="/hotels"/>
                <TopMenuItem title="Booking" pageRef="/mybooking"/>
            </div>
            <div className="flex flex-row">
                {
                    session? <>
                        <TopMenuItem title="Account" pageRef="/account"/>
                        <TopMenuItem title="Sign-Out" pageRef="/api/auth/signout"/>
                    </> :
                    <>
                        <TopMenuItem title="Sign-In" pageRef="/api/auth/signin"/>

                        <Link href="/register" className="p-3">
                            <button className="block rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
                            text-white shadow-sm" name="Register">Register</button>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}
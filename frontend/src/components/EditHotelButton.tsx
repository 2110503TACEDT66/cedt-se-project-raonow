import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function EditHotelButton() {
    const session = await getServerSession(authOptions)
    const role = session?.user.role

    if(role == "admin") return <div></div>
    else return (
        <div>
            <div className="flex flex-row justify-around">
                <Link href={"/hotels/[hid]/edit"}>
                <button className="block rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
                text-white shadow-sm">Edit Hotel</button>
                </Link>
                <button className="block rounded-md bg-red-500 hover:bg-red-800 px-3 py-2 
                text-white shadow-sm">Remove Hotel</button>
            </div>  : null
        </div>
        
    )
}
import Image from 'next/image'
import { getServerSession } from "next-auth";
import { MemberItem, MemberJSON, User } from "../../interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function MemberCard({member} : {member:MemberItem}) {

    const user: User = typeof member.user === 'string' ? JSON.parse(member.user) : member.user;

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md m-5 flex flex-row hover:bg-gray-100">
            <div className="w-[20%] items-center">
                <Image src={'/img/logo.jpg'} alt='logo image' width={100} height={100} className='object-cover rounded-l-lg'/>
            </div>
            <div className="w-[40%] flex flex-col items-left">
                <div className="ml-4">
                    <h1 className="text-xl font-semibold">{user.name}</h1>
                    <h3>Email: {user.email}</h3>
                    <h3>Address: {member.address}, {member.province}</h3>
                    <h3>Total booking: {member.bookingCount}</h3>
                </div>
            </div>
            <div className="w-[40%] flex flex-col items-left">
                <div className="ml-4">
                    <h1 className="text-xl font-semibold">Privilege Member</h1>
                    <h3>Current Point: {member.point}</h3>
                </div>
            </div>
        </div>
    )
}
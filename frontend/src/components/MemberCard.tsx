import Image from 'next/image'
import { getServerSession } from "next-auth";
import { MemberItem, MemberJSON, User } from "../../interface";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function MemberCard({memberJson} : {memberJson:Promise<MemberJSON>}) {

    const memberJsonReady = await memberJson;

    return (
        <div>
            <div className="text-2xl font-bold text-black ml-5 p-5">Membership</div>
            <div style={{margin: "20px", display: "flex", flexDirection:"column",
            flexWrap:"wrap", justifyContent:"center", alignContent:"space-around"}}>
                {
                    memberJsonReady.data.map((members:MemberItem)=> {
                        const user: User = typeof members.user === 'string' ? JSON.parse(members.user) : members.user;
                        return (
                            <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md m-5 flex flex-row">
                                <div className="w-[20%] items-center">
                                    <Image src={'/img/logo.jpg'}
                                    alt='logo image'
                                    width={100}
                                    height={100}
                                    className='object-cover rounded-l-lg'/>
                                </div>
                                <div className="w-[40%] flex flex-col items-left">
                                    <div className="ml-4">
                                        <h1 className="text-xl font-semibold">{user.name}</h1>
                                        <h3>Email: {user.email}</h3>
                                        <h3>Address: {members.address}, {members.province}</h3>
                                        <h3>Total booking: {members.bookingCount}</h3>
                                    </div>
                                </div>
                                <div className="w-[40%] flex flex-col items-left">
                                    <div className="ml-4">
                                        <h1 className="text-xl font-semibold">Privilege Member</h1>
                                        <h3>Current Point: {members.point}</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
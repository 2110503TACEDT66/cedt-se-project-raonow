import MemberCard from "@/components/MemberCard";
import getMembers from "@/libs/getMembers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import { MemberItem, MemberJSON, User } from "../../../interface";
import Image from 'next/image'
import getUserProfile from "@/libs/getUserProfile";
import getMember from "@/libs/getMember";

export default async function MemberPage() {
    
    const session = await getServerSession(authOptions);
    if(!session) return null;
    const user = await getUserProfile(session.user.token) as User;
    const member = user.data.member;
    const members = user.data.role === 'admin' ? await getMembers(session.user.token) as Promise<MemberJSON> : await getMember(session.user.token, member) as Promise<MemberJSON>;
    
    return (
        <div className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
            <div className="text-2xl font-bold text-black ml-5 p-5">Membership</div>
            <div style={{margin: "20px", display: "flex", flexDirection:"column",
            flexWrap:"wrap", justifyContent:"center", alignContent:"space-around"}}>
                {
                    (await members).data.map((member:MemberItem)=> {
                        return (
                            <MemberCard member={member}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
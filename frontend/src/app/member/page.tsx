import MemberCard from "@/components/MemberCard";
import getMembers from "@/libs/getMembers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/[...nextauth]";
import Link from "next/link";
import { MemberItem, MemberJSON, User } from "../../../interface";
import Image from 'next/image'
import getUserProfile from "@/libs/getUserProfile";
import getMember from "@/libs/getMember";
import getCampaign from "@/libs/getCampaigns";
import PrivilegeCard from "@/components/PrivilegeCard";

export default async function MemberPage() {
    
    const session = await getServerSession(authOptions);
    if(!session) return null;
    const user = await getUserProfile(session.user.token) as User;
    
    if(user.data.role == 'admin') {
        const members = await getMembers(session.user.token);
        return (
            <div className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
                <div className="text-2xl font-bold text-black ml-5 p-5">Membership List</div>
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

    const members = await getMember(session.user.token, user.data.member);
    const campaigns = await getCampaign(session.user.token);
    return (
        <div className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
            <div className="text-2xl font-bold text-black ml-5 p-5">Membership</div>
            <div style={{margin: "20px", display: "flex", flexDirection:"column",
            flexWrap:"wrap", justifyContent:"center", alignContent:"space-around"}}>
                <MemberCard member={members.data as MemberItem}/>
            </div>
            <div className="text-2xl font-bold text-black ml-5 p-5">Redeem campaigns</div>
            { 
                campaigns.data.map((campaign:any) => {
                    return (
                        <PrivilegeCard campaign={campaign} session={session}/>
                    )
                }) 
            }         
        </div>
    )
    
}
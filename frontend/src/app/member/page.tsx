import MemberCard from "@/components/MemberCard";
import getMembers from "@/libs/getMembers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

export default async function MemberPage() {
    
    const session = await getServerSession(authOptions);
    const members = getMembers(session?.user.token);
    return (
        <div>
            <MemberCard memberJson={members}/>
        </div>
    )
}
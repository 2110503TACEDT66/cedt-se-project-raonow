import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/[...nextauth]";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";
import CreateCampaignForm from "@/components/CreateCampaignForm";

export default async function createCampaign() {
    const session = await getServerSession(authOptions);
    if(!session || !session.user.token) return null

    const userProfile = await getUserProfile(session.user.token)
    if(userProfile === 'user'){
        return (
            <main className="flex items-center justify-center h-[77vh]">
                <div className="w-2/3 p-4">
                    <h1 className="text-3xl font-bold my-[20px] text-center">401 Unauthorized</h1>
                    <h2 className="text-lg my-2 text-center">You are not authorized to access this page.</h2>
                    <div className="text-mediun my-2 text-center underline text-blue-500"><Link href="/..">Return to homepage</Link></div>
                </div>
            </main>
        );
    }

    return(
        <main className="w-[100%] flex flex-col items-center">
            <div className="w-[100%] h-[70%]"><CreateCampaignForm session={session}/></div>
        </main>
    )
}
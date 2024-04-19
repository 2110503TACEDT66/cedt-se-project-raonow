import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/[...nextauth]";
import MemberCard from "@/components/MemberCard";
import getMember from "@/libs/getMember";
import getDashboard from "@/libs/getDashboard";
import getCampaign from "@/libs/getCampaigns";
import { dashboardItem, CampaignItem } from "../../../interface";
import Image from "next/image";
import Link from "next/link";
// import DashboardCard from "@/components/DashboardCard";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    console.log(session?.user);
    if (!session) return null;
    
    const userProfile = await getUserProfile(session.user.token);
    if (userProfile.data.role === 'user') {
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

    const dashbaord = await getDashboard(session.user.token);
    console.log(dashbaord.data);
    const member = await getMember(session.user.token, userProfile.data.member);
    const campaigns = await getCampaign(session.user.token)
    return (
        <main className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
            <h1 className="text-2xl font-bold pb-4">Admin Dashboard</h1>
            <MemberCard member={member.data}/>

            <h1 className="text-2xl font-bold pb-4">Number of bookings in the past 60 days</h1>
            
            <div className="border rounded-md flex flex-row justify-between py-4 px-6 shadow-md 
            bg-white hover:bg-gray-100">
                {dashbaord.data.booking && dashbaord.data.booking.length > 0 ? (
                    dashbaord?.data.booking.map((dboard:dashboardItem) => (
                        <div className="flex flex-col">
                            <span className="text-xl font-medium pb-3">{dboard.province}</span>
                            <span className="text-3xl font-semibold">{dboard.count}</span>
                        </div>
                    ))
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>

            <h1 className="text-2xl font-bold pb-4">Redeem campaign</h1>
            
            <div>
                {
                    campaigns.data.map((campaign: CampaignItem) => (
                        <div className="relative w-full mx-auto p-6 bg-white rounded-lg shadow-md m-5 flex flex-row hover:bg-gray-100 border">
                            <div className="">
                                <Image src={'/img/logo.jpg'} alt='logo image' width={100} height={100} className='object-cover rounded-l-lg'/>
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <div className="font-bold">{campaign.title}</div>
                                        <div>{campaign.description}</div>
                                    </div>
                                    <div className="ml-4">
                                        <button className="bg-green-500 text-white rounded-2xl px-[23px] py-[6px]">
                                            {campaign.point} Point
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                <div className="font-sm font-bold">
                                    Use: {campaign.totalAmount - campaign.amountLeft}/{campaign.totalAmount}
                                </div>
                                <div className="flex space-x-4">
                                    <Link href={`/campaign/${campaign._id}/update`}>
                                        <button className="bg-orange-500 text-white rounded-2xl px-[42px] py-[6px] mr-2"
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                        <button className="bg-red-500 text-white rounded-2xl px-[34px] py-[6px]">   
                                            Delete
                                        </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Link href={`/campaign/create`}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 
                            rounded flex items-center space-x-2 h-full justify-center'>Create
                           
            </Link>
        </main>
    );
}


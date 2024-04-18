import getUserProfile from "@/libs/getUserProfile";
import getBookings from "@/libs/getBookings";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/[...nextauth]";
import MemberCard from "@/components/MemberCard";
import getMember from "@/libs/getMember";
import getDashboard from "@/libs/getDashboard";
import getCampaign from "@/libs/getCampaigns";
import { dashboardItem, campaignItem } from "../../../interface";
import Image from "next/image";
// import DashboardCard from "@/components/DashboardCard";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    if (!session) return null;
    
    const userProfile = await getUserProfile(session.user.token);
    if (userProfile.data.role === 'user') {
        return (
            <main className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
                <h1 className="text-2xl font-bold my-4">This page is for admin!!</h1>
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
                    campaigns.data.map((campaign: campaignItem) => (
                        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md m-5 flex flex-row hover:bg-gray-100">
                            <div className="">
                                <Image src={'/img/logo.jpg'} alt='logo image' width={100} height={100} className='object-cover rounded-l-lg'/>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex flex-col justify-between ml-4">
                                        <div className="font-bold">{campaign.title}</div>
                                        <div>{campaign.description}</div>
                                    </div>
                                    <div className="">
                                        <button className="bg-green-500 text-white rounded-full px-4 py-2">
                                            Point: {campaign.point}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-row pt-4">
                                <div className="font-sm font-bold justify-between ml-4">
                                    Use: {campaign.totalAmount - campaign.amountLeft}/{campaign.totalAmount}
                                </div>
                                <div className="ml-40">
                                        <button className="bg-orange-500 text-white rounded-full px-4 py-2 mr-2">
                                            Edit
                                        </button>
                                        <button className="bg-red-500 text-white rounded-full px-4 py-2">
                                            Delete
                                        </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </main>
    );
}


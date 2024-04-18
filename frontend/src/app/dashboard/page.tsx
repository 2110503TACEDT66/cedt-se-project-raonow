import getUserProfile from "@/libs/getUserProfile";
import getBookings from "@/libs/getBookings";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import MemberCard from "@/components/MemberCard";
import getMember from "@/libs/getMember";
//import RedeemCampaignCard from "@/components/RedeemCampaignCard";

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

    const bookings = await getBookings(session.user.token);

    const provinceCounts: { [key: string]: number } = {};
    const sixtyDaysAgo = new Date().getTime() - (60 * 24 * 60 * 60 * 1000);

    bookings.data.forEach((booking: { hotel: { province: string }; bookDate: string }) => {
        const province = booking.hotel.province;
        const bookDateTimestamp = new Date(booking.bookDate).getTime();
        
        if (bookDateTimestamp >= sixtyDaysAgo) {
            provinceCounts[province] = (provinceCounts[province] || 0) + 1;
        }
    });

    const member = await getMember(session.user.token, userProfile.data.member);
    
    return (
        <main className="container mx-auto px-4 py-4 w-2/3 space-y-4 min-h-screen">
            <h1 className="text-2xl font-bold pb-4">Admin Dashboard</h1>
            <MemberCard member={member.data}/>

            <h1 className="text-2xl font-bold pb-4">Number of bookings in the past 60 days</h1>
            {Object.keys(provinceCounts).length > 0 ? (
                <div className="border rounded-md flex flex-row justify-between py-4 px-6 shadow-md bg-white hover:bg-gray-100">
                    {Object.entries(provinceCounts).map(([province, count]) => (
                        <div className="flex flex-col">
                            <span className="text-xl font-medium pb-3">{province}</span>
                            <span className="text-3xl font-semibold">{count}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No bookings found.</p>
            )}

            <h1 className="text-2xl font-bold pb-4">Redeem campaign</h1>
            
        </main>
    );
}

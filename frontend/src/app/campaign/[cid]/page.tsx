import { authOptions } from "@/app/api/auth/[...nextauth]/[...nextauth]";
import RedeemPointCard from "@/components/RedeemPointCard"
import getCampaign from "@/libs/getCampaign";
import { getServerSession } from "next-auth";
export default async function RedeemCampaignPage({params}: {params: {cid: string}}) {
  const session = await getServerSession(authOptions);
  const token = session?.user.token;
  const campaign = await getCampaign(token||'', params.cid, );

  return (
    <div className='w-[70%] h-screen justify-center p-4'>
      <RedeemPointCard token={token||''} campaignItem={campaign.data}/>
    </div>
  )
}

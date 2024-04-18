'use client'

import PrivilegeCard from "./PrivilegeCard";
import { CampaignJSON } from "../../interface";
import getCampaign from "@/libs/getCampaigns";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/[...nextauth]';

export default async function RedeemCampaignCatalog() {
    const session = await getServerSession(authOptions);
    if(!session) return null;
    const campaigns:CampaignJSON = await getCampaign(session.user.token);

    return (
        <div style={{
            margin: "20px",
            display: "flex",
            flexDirection:"column",
            flexWrap:"wrap",
            justifyContent:"center",
            alignContent:"space-around"
        }}>
            {
                campaigns.data.map((item) => (
                    <PrivilegeCard campaign={item} session={session}/>
                ))
            }
        </div>
    )
}
import Image from 'next/image';
import { campaignItem } from '../../interface';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PrivilegeCard({campaign} : {campaign:campaignItem}) {
    const thisCampaign = campaign;
    const router = useRouter();
    const handleDeleteCampaign = async (id: string) => {
        console.log("deleting campaign")

        try {
            //await deleteCampaign();
            console.log("delete booking success");
            router.refresh();
        } catch (error:any) {
            console.log(error.message);
        }
    };

    return (
        <div className="w-[70%] mx-auto p-6 bg-white rounded-lg shadow-md m-5 flex flex-row hover:bg-gray-100 border">
            <div className="w-[20%] items-center">
                <Image src={'/img/logo.jpg'} alt='logo image' width={100} height={100} className='object-cover rounded-l-lg'/>
            </div>
            <div className="w-[60%] flex flex-col items-left">
                <div className="ml-4">
                    <h1 className="text-3xl font-semibold">{thisCampaign.title}</h1>
                    <h3>{thisCampaign.description}</h3>
                    <h3 className="text-lg">Use: {thisCampaign.amountLeft}/{thisCampaign.totalAmount}</h3>
                </div>
            </div>
            <div className="w-[20%] flex flex-col items-left">
                <div className="ml-4">
                    
                        <button className="block rounded-lg bg-green-500 hover:bg-green-600 w-32 py-2 
                            text-white shadow-sm my-1">{thisCampaign.point} Points</button>
                            <button className="block rounded-lg bg-orange-400 hover:bg-orange-500 w-32 py-2 
                            text-white shadow-sm my-1">Edit</button>
                            <button className="block rounded-lg bg-red-500 hover:bg-red-600 w-32 py-2 
                            text-white shadow-sm my-1"
                            onClick={() => { handleDeleteCampaign(campaign._id as string); }}>Delete</button>
                </div>
            </div>
        </div>
    )
}
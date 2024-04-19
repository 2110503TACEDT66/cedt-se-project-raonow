'use client'
import Image from 'next/image';
import { CampaignItem } from '../../interface';
import createCoupon from '@/libs/createCoupon';

export default function RedeemPointCard({token, campaignItem} : {token:string, campaignItem:CampaignItem}){

    const redeem = async () => {
        const couponData = await createCoupon(token, campaignItem._id||'') as any;
        const coupon = await couponData.data;
        alert('Coupon created');
        try {
            const couponData = await createCoupon(token, campaignItem._id||'') as any;
            const coupon = await couponData.data;
            alert('Coupon created');
        } catch {
            alert('Failed to create coupon');
        }
    }

    return( <div className="w-[70%] px-10 bg-gray-200 rounded-t-lg flex flex-row py-5 ">
    <div className="relative ">
    <div style={{ width: 120, height: 120, float:'left'}}>       
          <Image
            src={'/img/logo.jpg'}
            alt="Product Picture"
            layout="fill"
            className="rounded-lg w-[30%] bg-black"
            />

     </div>

    </div>
    <div className='mx-5 my-2 flex flex-col'>
     <div className='text-[35px]'>{campaignItem.title}</div>
    <div  className='text-[25px]' > {campaignItem.description}</div>
    <button type='submit' onClick={redeem}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-16 
                rounded flex justify-center text-center space-x-2 w-2/3 shadow-lg items-center'
            >Redeem
    </button>
    </div>

    {/* <div  className='absolute flex flex-col right-0 mx-5 items-center '>
{
     userPoints >= points?
      <div className='bg-lime-600 text-white px-4 py-4 rounded-md'>{campaignItem.points} Points</div>
     :<div className='bg-gray-400 text-white px-4 py-4 rounded-md'>{campaignItem.points} Points</div>
}
    


    <div>{campaignItem.islimited}</div>
    </div> */}
    
    
</div>)
} 

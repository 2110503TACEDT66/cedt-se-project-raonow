// 'use client'
// import updateCampaign from "@/libs/updateCampaign";
// import { ChangeEvent, useState, useEffect } from "react";
// import { Select, MenuItem, CircularProgress, TextField, Radio } from "@mui/material";
// import { CheckBox } from "@mui/icons-material";
// import { useRouter } from 'next/navigation';

// type RouterQuery = {
//     cid: string;
// };

// export default function UpdateCampaignForm({params}:{params: {cid: string}}) {
//     const cid = params.cid;
//     const router = useRouter();

//     const [campaignItem, setCampaignItem] = useState<any>(null);

//     useEffect(() => {
//         // Fetch item data based on the 'id' from your API or local data source
//         if (typeof cid === 'string') {
//             fetchCampaignItem(cid);
//           }
//     }, [cid]);

//     const fetchCampaignItem = async (campaignId: string) => {
//         try {
//           const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campaign/${campaignId}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch campaign data');
//           }
//           const cItem = await response.json();
//           setCampaignItem(cItem);
//         } catch (error) {
//           console.error('Error fetching item data:', error);
//         }
//     };

//     const [title, setTitle] = useState<string>('')
//     const [desc, setDesc] = useState<string>('')
//     const [isLimitAmount, setLimitAmount] = useState<number>(0);
//     const [point, setPoint] = useState<number>(0);
//     const [isLoading, setIsLoading] = useState(false);

//     const handlePointChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const inputValue = event.target.value;
//         const numericValue = parseFloat(inputValue);
//         setPoint(numericValue);
//     };
//     const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const inputValue = event.target.value;
//         const numericValue = parseFloat(inputValue);
//         setLimitAmount(numericValue);
//     };

//     const handleUpdateCampaign = async () => {
//         if (!cid) return;
//         setIsLoading(true); // Start loading animation
      
//         try {
//           await updateCampaign(
//             campaignItem.title,
//             desc,
//             session.user.token,
//             cid,
//             point,
//             isLimitAmount
//           );
//           console.log('Update Campaign success');
//           alert('Campaign updated successfully');
//         } catch (error) {
//           console.error('Error updating campaign:', error);
//           // Handle error (e.g., show error message to user)
//         } finally {
//           setIsLoading(false); // Stop loading animation
//         }
//       };


//   // Render the edit form with 'itemData' once it's loaded
//   if (!campaignItem) return;
//   return (
//     <div>
//       <h1>Update Campaign</h1>
//         <form className='w-[80vw] mx-auto my-4 p-10 bg-white rounded-lg shadow-lg h-[100%] items-center'>
//                     <div>
//                         <div className="text-left">
//                             <div>
//                                 <div className="font-semibold">Title</div>
//                                 <div> <TextField id='title' name='title' className='border px-5 py-2 rounded-md' size="small"
//                                 onChange={(e)=>{setTitle(e.target.value)}} defaultValue={campaignItem.title}></TextField></div>
//                             </div>
//                             <div>
//                                 <div className="font-semibold text-justify" style={{ verticalAlign: 'top'  }}>Description</div>
//                                 <div> <TextField id='description' name='description' className='border px-5 py-2 rounded-md' multiline={true} rows={3}
//                                 onChange={(e)=>{setDesc(e.target.value)}}></TextField></div>
//                             </div>
//                             <div>
//                                 <div className="font-semibold">Point</div>
//                                 <div> <TextField id='point' name='point' type="number" className='border px-5 py-2 rounded-md' size="small"
//                                 value={point < 0 ? 0 : point} onChange={handlePointChange}> </TextField></div>
//                                 </div>
//                             <div>
//                                 <div className="font-semibold">Limited Area</div><div><CheckBox/></div>
//                                 <div>
//                                     <Select className='border rounded-md'>
//                                         <MenuItem id='Bangkok'>Chiang Mai</MenuItem>
//                                         <MenuItem id='Chiang Mai'>Bangkok</MenuItem>
//                                         <MenuItem id='Chonburi'>Chonburi</MenuItem>
//                                         <MenuItem id='Phuket'>Phuket</MenuItem>
//                                     </Select>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="font-semibold">Limit Amount</div><div><CheckBox/></div>
//                                 <div> <TextField id='limitAmount' type="number" name='limitAmount' className='border px-5 py-2 rounded-md' size="small"
//                                 value={isLimitAmount < 0 ? 0 : isLimitAmount}onChange={handleAmountChange}></TextField></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='mx-auto'>
//                         {isLoading ?
//                             <CircularProgress size={24} color="inherit" /> :
//                         <div className='flex justify-between space-x-6 mt-2 w-full'>
//                         <button type='submit' onClick={(event) => {handleUpdateCampaign();}}
//                             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded flex items-center space-x-2'
//                         >Confirm Update</button>
//                         </div>
//                         }
//                     </div>
//                 </form>

//     </div>
//   );
// }
// /*
//     const [isLimitArea, setLimitArea] = useState(null);
//     const [isLimitAmount, setLimitAmount] = useState<number>(0);
//     const [duration, setDuration] = useState<number>(30);
//     const [onePerUse, setOnePerUse] = useState(true);
//     const [title, setTitle] = useState<string>('')
//     const [desc, setDesc] = useState<string>('')
//     const [discType, setDiscType] = useState<string>('percentage')
//     const [discAmount, setDiscAmount] = useState<number>(10)
//     const [point, setPoint] = useState<number>(0);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleUpdateCampaign = async () => {
//         if (!cid) return;

//         setIsLoading(true); // Start loading animation
        
//         try {      
//             await updateCampaign(title, desc, session.user.token, cid, point, isLimitAmount);
//             console.log("update Booking success");
//             alert("Booking updated successfully");
//         } catch (error) {
//             console.error("Error update booking:", error);
//         } finally {
//             setIsLoading(false); // Stop loading animation
//         }
//     };

//     const handleDeleteCampaign = async () => {
//         console.log("calling delete campaign")
//         setIsLoading(true);
//         try {
//             const token = session.user.token;
//             await deleteCampaign(token, cid);
//             console.log("delete campaign success");
//         } catch (error:any) {
//             console.log(error.message);
//         } finally {
//             setIsLoading(false);
//         }
//     };

    
//     return (
//         <main className='bg-gray-100 w-full h-[82vh] flex items-center justify-center flex flex-col'>
//                 <div className='text-2xl font-bold mt-[20px] flex'>Update Campaign</div>
                
//         </main>
//     );
// }*/

export default function UpdateBook() {
    return (
        <div>Not available</div>
    )
}
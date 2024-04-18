"use client"
import createCampaign from "@/libs/createCampaign";
import { CampaignItem } from "../../interface"
import { ChangeEvent, useState } from "react";
import { Select, MenuItem, ListItemIcon, CircularProgress, TextField, Radio } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckBox, Description } from "@mui/icons-material";



export default function CreateCampaignForm({session}:{session:any}) {

    const [isLimitArea, setLimitArea] = useState(null);
    const [isLimitAmount, setLimitAmount] = useState<number>(0);
    const [duration, sedivuration] = useState<number>(30);
    const [onePerUse, setOnePerUse] = useState(true);
    const [title, setTitle] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [discType, sediviscType] = useState<string>('percentage')
    const [discAmount, sediviscAmount] = useState<number>(10)
    const [point, setPoint] = useState<number>(0);

    const [isComplete, setIsComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(session?.user.token)
    const menuClass = "px-3 py-1 space-x-2";
    const router = useRouter();

    const handleCreateCampaign = async () => {
        if ( title === '' || desc === '' || point < 0 ) return alert("Please fill out all required fields.");
        setIsLoading(true);
        try {
            await createCampaign(
                session?.user.token,
                title,desc,point,onePerUse,discType,discAmount,
                isLimitArea,isLimitAmount,duration
            )
            setIsComplete(true);
        } catch (error:any) {
            alert("Create booking failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePointChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);
        setPoint(numericValue);
    };
    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numericValue = parseFloat(inputValue);
        setLimitAmount(numericValue);
    };

    if (isComplete) return (
        <div className="flex flex-col text-center font-bold text-green-600 mt-4 text-xl">
            
        </div>
    );

    if (isLoading) 
        return (
        <div className="flex justify-center items-center w-full mt-4">
            <CircularProgress size={30} color="inherit" />
        </div>
    );

    return (
        <main className='bg-gray-100 w-screen h-full flex items-center justify-center flex-col'>
                <div className='text-2xl font-bold mt-[20px] flex'>Create Campaign</div>
                <form className='w-[80vw] mx-auto my-4 p-10 bg-white rounded-lg shadow-lg h-[100%] items-center'>
                    <div className='justify-between'>
                        <div className="text-left">
                            <div className="flex justify-center">
                                <div className="font-semibold flex-col align-center">Title</div>
                                <div className="flex-col"> <TextField id='title' name='title' className='border px-5 py-2 rounded-md' size="small"
                                onChange={(e)=>{setTitle(e.target.value)}}></TextField></div>
                            </div>
                            <div className="flex">
                                <div className="font-semibold text-justify flex-col" style={{ verticalAlign: 'top'  }}>Description</div>
                                <div> <TextField id='description' name='description' className='border px-5 py-2 rounded-md' multiline={true} rows={3}
                                onChange={(e)=>{setDesc(e.target.value)}}></TextField></div>
                            </div>
                            <div>
                                <div className="font-semibold">Point</div>
                                <div> <TextField id='point' name='point' type="number" className='border px-5 py-2 rounded-md' size="small"
                                value={point < 0 ? 0 : point} onChange={handlePointChange}> </TextField></div>
                                </div>
                            <div className='flex space-x-4 w-full items-center'>
                                <div className="font-semibold">Limited Area</div>
                                <div><CheckBox/></div>
                                <Select className='border rounded-md w-1/3'>
                                    <MenuItem id='Bangkok'>Chiang Mai</MenuItem>
                                    <MenuItem id='Chiang Mai'>Bangkok</MenuItem>
                                    <MenuItem id='Chonburi'>Chonburi</MenuItem>
                                    <MenuItem id='Phuket'>Phuket</MenuItem>
                                </Select>
                            </div>
                            <div className='flex space-x-4 w-full items-center'>
                                <div className="font-semibold">Limit Amount</div><div><CheckBox/></div>
                                <div> <TextField id='limitAmount' type="number" name='limitAmount' className='border px-5 py-2 rounded-md' size="small"
                                value={isLimitAmount < 0 ? 0 : isLimitAmount}onChange={handleAmountChange}></TextField></div>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center"><button type='submit' onClick={(event)=> {
                            event.preventDefault(); handleCreateCampaign();}}
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 
                            rounded flex items-center space-x-2 h-full justify-center'>
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Create"}
                        </button></div>
                        
                    </div>
                </form>
        </main>
    );
}

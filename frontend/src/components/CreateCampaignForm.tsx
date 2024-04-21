"use client"
import createCampaign from "@/libs/createCampaign";
import { CampaignItem } from "../../interface"
import { ChangeEvent, useState } from "react";
import { Select, MenuItem, CircularProgress, TextField, Radio, Checkbox, SelectChangeEvent } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";


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
    const [selectedItem, setSelectedItem] = useState<string>('');

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
    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedItem(event.target.value as string);
      };
    

    if (isComplete) return (
        <div className="flex flex-col text-center font-bold text-green-600 mt-4 text-xl">
            <Link href='/dashboard'>Return to dashboard</Link>
        </div>
    );

    if (isLoading) 
        return (
        <div className="flex justify-center items-center w-full mt-4">
            <CircularProgress size={30} color="inherit" />
        </div>
    );

    return (
        <main className='bg-gray-100 w-screen h-[100%] flex flex-col items-center justify-center'>
                <div className='text-2xl font-bold mt-[20px] flex'>Create Campaign</div>
                <form className='w-[60vw] mx-auto my-4 p-6 bg-white rounded-lg shadow-lg h-[100%]'>
                    <div className='justify-between'>
                        <table className="text-left border-solid mx-auto mb-3">
                            <tbody>
                                <tr className="flex justify-center border-solid">
                                    <td className="font-semibold flex-col my-2 mr-auto border-solid">Title</td>
                                    <td className="flex flex-col w-[75%] border-solid"> <TextField id='title' name='title' className='border px-5 py-2 rounded-md' size="small"
                                    onChange={(e)=>{setTitle(e.target.value)}}></TextField></td>
                                </tr>
                                <tr className="flex justify-center border-solid">
                                    <td className="font-semibold flex-col my-2 mr-auto border-solid" style={{ verticalAlign: 'top'  }}>Description</td>
                                    <td className="flex flex-col w-[75%] border-solid"> <TextField id='description' name='description' className='border px-5 py-2 rounded-md' multiline={true} rows={4}
                                    fullWidth onChange={(e)=>{setDesc(e.target.value)}}></TextField></td>
                                </tr>
                                <tr className="flex justify-center border-solid">
                                    <td className="font-semibold flex-col my-2 mr-auto border-solid">Point</td>
                                    <td className="flex flex-col w-[75%] border-solid"> <TextField id='point' name='point' type="number" className='border px-5 py-2 rounded-md' size="small" fullWidth
                                    value={point < 0 ? 0 : point} onChange={handlePointChange}> </TextField></td>
                                </tr>
                                <tr className='flex border-solid'>
                                    <td className="font-semibold w-[28%] my-2 border-solid">Limited Area</td>
                                    <td className="border-solid w-1/6"><Checkbox/></td>
                                    <td className="border-solid w-2/4">
                                        <Select className='rounded-md w-[92%] mx-4 my-1' size="small">
                                            <MenuItem id='Bangkok'>Chiang Mai</MenuItem>
                                            <MenuItem id='Chiang Mai'>Bangkok</MenuItem>
                                            <MenuItem id='Chonburi'>Chonburi</MenuItem>
                                            <MenuItem id='Phuket'>Phuket</MenuItem>
                                        </Select>
                                    </td>
                                </tr>
                                <tr className='flex border-solid\'>
                                    <td className="font-semibold w-[28%] my-2 border-solid">Limit Amount</td>
                                    <td className="border-solid w-1/6"><Checkbox/></td>
                                    <td className="border-solid w-2/4">
                                    <TextField id='limitAmount' type="number" name='limitAmount' className='mx-4 my-1 w-[92%] rounded-md' size="small"
                                    value={isLimitAmount < 0 ? 0 : isLimitAmount}onChange={handleAmountChange}></TextField>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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

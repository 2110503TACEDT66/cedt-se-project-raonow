'use client'
import React, { useState } from "react";
import createMember from "@/libs/createMember";
import getUserProfile from "@/libs/getUserProfile";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateMemberForm({ session }: { session: any }) {
    const [memberData, setMemberData] = useState({
        address: '',
        province: '',
        birthday: dayjs()
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!memberData.address || !memberData.province || !memberData.birthday) {
            alert("Please fill in all required Information");
            return;
        }
        const user = await getUserProfile(session?.user.token);
        try {
            await createMember(
                session?.user.token,
                user,
                memberData.address,
                memberData.province,
                // dayjs(memberData.birthday).format('YYYY/MM/DD')
                memberData.birthday.format('YYYY/MM/DD')
            );
            // reset the form fields after successful submission
            setMemberData({
                address: '',
                province: '',
                birthday: dayjs()
            });
        } catch (error) {
            alert('Create Member failed');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMemberData({...memberData, [name]: value});
    };

    const handleDateChange = (value: Dayjs | null) => {
        setMemberData({...memberData, birthday: value || dayjs()});
    };

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit}>
                <div className="text-2xl text-center text-black font-bold p-3">Member Registration</div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="address">Address</label>
                    <input type="text" required id="address" name="address"
                    value={memberData.address} onChange={handleInputChange}
                    className="bg-white border-2 border-gray-200 rounded w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="province">Province</label>
                    <input type="text" required id="province" name="province"
                    value={memberData.province} onChange={handleInputChange}
                    className="bg-white border-2 border-gray-200 rounded w-full p-2
                    text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex items-center w-full my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="birthday">Birthday</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            className="bg-white w-[280px]"
                            value={memberData.birthday}
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                </div>
                <div className="p-2 flex flex-row">
                <button className="block mx-auto rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
                text-white shadow-sm justify-center w-56" type="submit">
                    Register to Member
                </button>
                </div>
            </form>
            <Link href='/member'>
            <button className="block mx-auto rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
            text-white shadow-sm justify-center w-56">Member page</button>
            </Link>
        </div>
    );
}
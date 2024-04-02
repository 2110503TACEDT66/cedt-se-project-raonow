"use client"
import { CircularProgress, TextField, Button } from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import userRegister from "@/libs/userRegister";

type User = {
    id : string;
    name : string;
    email : string;
    password : string;
    telephoneNumber : string;
    role : string;
    createdAt : Date;
}

export default function RegisterationForm() {

    const [values, setValues] = useState<User>({
        id: "0",
        name: "",
        email: "",
        password: "",
        telephoneNumber: "",
        role: "user",
        createdAt: new Date()
    });

    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        event.preventDefault();
        if (!values.name || !values.email || !values.password || !values.telephoneNumber) {
            alert("Please fill in all fields");
            return;
        }
        userRegister(values).then(data => {
            setLoading(false);
            setIsRegistered(true);
        }).catch(error => {
            setLoading(false);
            alert("Cannot create user");
        });
    };

    if (isRegistered) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-center mb-4 text-green-600">User created successfully</h1>
                <div className="flex justify-between w-full max-w-xs bottom-20 text-xl pt-96">
                    <Link href="/">
                        <button className="block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 
                        transition-colors text-center flex-1 mr-2 w-32">Home</button>
                    </Link>
                    <Link href="/api/auth/signin">
                        <button className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 
                        transition-colors text-center flex-1 ml-2 w-32">Login</button>
                    </Link>
                </div>
            </div>
        );
    }
    
    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <CircularProgress />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off" className="justify-center w-2/5 text-base space-y-4 mx-auto">
            <TextField id="name" label="Name" value={values.name} onChange={handleChange('name')} fullWidth />
            <TextField id="email" label="Email" value={values.email} onChange={handleChange('email')} fullWidth />
            <TextField id="password" label="Password" type="password" value={values.password} onChange={handleChange('password')} fullWidth />
            <TextField id="telephoneNumber" label="Telephone Number" value={values.telephoneNumber} onChange={handleChange('telephoneNumber')} fullWidth />
            <button className="block mx-auto rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
                    text-white shadow-sm justify-center w-32" type="submit">Register</button>
        </form>
    );
}

'use client'
import { useSession } from "next-auth/react"
import { TextField } from "@mui/material"

export default function UpdateHotelForm() {
    const {data:session} = useSession()
    const role = session?.user.role

    return(
        role == "admin"?
        <p className="text-center text-2xl my-10">You're Admin</p> : 
        <p className="text-center text-2xl my-10">Not authorize to access this page</p>
    )
}

/*
<form onSubmit={handleSubmit} noValidate autoComplete="off" className="justify-center w-2/5 text-base space-y-4 mx-auto">
            <TextField id="name" label="Name" value={values.name} onChange={handleChange('name')} fullWidth />
            <TextField id="email" label="Email" value={values.email} onChange={handleChange('email')} fullWidth />
            <TextField id="password" label="Password" type="password" value={values.password} onChange={handleChange('password')} fullWidth />
            <TextField id="telephoneNumber" label="Telephone Number" value={values.telephoneNumber} onChange={handleChange('telephoneNumber')} fullWidth />
            <button className="block mx-auto rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
                    text-white shadow-sm justify-center w-32" type="submit">Register</button>
        </form>
*/
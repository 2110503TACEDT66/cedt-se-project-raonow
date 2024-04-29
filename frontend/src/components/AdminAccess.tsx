'use client'
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function AdminAccess() {
  const [passcode, setPasscode] = useState("");
  const onButtonClick = () => {
    if (passcode !== "root9999") return;
    signIn('credentials', { email: "admin999@admin.com", password: "root9999" })
  }
  return (
    <div className="h-screen w-screen container justify-center ">
      <input type="text" placeholder="Passcode" onChange={(e)=>{setPasscode(e.target.value)}}
      className="bg-gray-100"/>
      <button className="bg-blue-500 hover:bg-blue-600" onClick={onButtonClick}>Instant admin access</button>
    </div>
  )
}

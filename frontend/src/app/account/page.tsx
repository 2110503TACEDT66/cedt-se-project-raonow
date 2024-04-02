import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
import Link from "next/link";

export default async function AccountPage () {
    const session = await getServerSession(authOptions);
    const user = session? await getUserProfile(session.user?.token) : null;
    const createdAt = new Date(user.data.createdAt).toLocaleString();
    return (
        <main className="pt-8 items-center min-h-screen">
            <div className="max-w-xl mx-auto">
                <h1 className="text-center text-2xl font-bold mb-4">My Account</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <h2 className="font-bold">Name:</h2>
                        <p className="text-left">{user.data.name}</p>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="font-bold">Email:</h2>
                        <p className="text-left">{user.data.email}</p>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="font-bold">Telephone Number:</h2>
                        <p className="text-left">{user.data.telephoneNumber}</p>
                    </div>
                    <div className="flex justify-between">
                        <h2 className="font-bold">Member since:</h2>
                        <p className="text-left">{createdAt}</p>
                    </div>
                    {
                        user.data.role === "admin" && (
                            <div className="flex justify-between">
                                <h2 className="font-bold">Role:</h2>
                                <p className="text-left">{user.data.role}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </main>
    )
}
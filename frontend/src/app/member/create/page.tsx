import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/[...nextauth]";
import CreateMemberForm from "@/components/CreateMemberForm";

export default async function CreateMember() {
    const session = await getServerSession(authOptions);
    return (
        <main className="w-[100%] h-screen flex flex-col items-center space-y-4">
            <CreateMemberForm session={session}/>
        </main>
    )
}
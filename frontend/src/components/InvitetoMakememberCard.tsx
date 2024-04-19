import Link from "next/link";
export default function InviteToMakeMemberCard(){
    return (
        <div className=" bg-white rounded-xl fixed bottom-0 right-0 w-[18%] h-[18%] z-50 font-semibold">
            <div className ="px-10 max-w-100 text-center my-auto font-sans text-sm text-gray-500 py-4">Looks like you aren't our member yet?</div>

            <div className = " bg-white rounded-3xl flex flex-col items-center ">

            <Link href = {`/member/create`}>
              
                <div className = "block rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 text-white shadow-sm bottom-0">join member!</div>
                </Link>
            </div>
            
        </div>
    )
}
// change link in herf rn its /hotels  
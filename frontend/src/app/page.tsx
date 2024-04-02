import Banner from "@/components/Banner";
import PromoteCard from "@/components/PromoteCard";
import getBookings from "@/libs/getBookings";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import getUserProfile from "@/libs/getUserProfile";
export default async function Home() {

  return (
    <main className="">
      <Banner />
      <PromoteCard />
    
    </main>
  );
}

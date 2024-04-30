// 'use client'
'use server'
import getReviews from "@/libs/getReviews";
import ReviewPanel from "./ReviewPanel";
import { Session } from "next-auth";
import { HotelItem, ReviewBasicJSON } from "../../interface";
// import { useEffect } from "react";

export default async function ReviewHolder({session, hotel, header}:{session: Session, hotel: HotelItem, header: ReviewBasicJSON}) {
  const reviews = await getReviews({ token: session?.user.token, hotel: hotel._id, query: {} });
  return (
    <div>
      <ReviewPanel session={session} hotel={hotel} viewType="user" header={header} reviews={reviews}/>
    </div>
  )
}

// async function ReviewLoader({session, hotel}:{session: Session|null, hotel: string}) {
//   const header = await getReviews({ token: session?.user.token, hotel: hotel, query: { header: 1 } });
//   return <ReviewPanelBasic reviewBasicInput={header} />;
// }

// export function ReviewLoaderWithSuspense({
//   session, hotel, reviewHeader,
// }: {
//   session: Session|null, hotel: string,
//   reviewHeader?: ReviewBasicJSON;
// }) {
//   if (reviewHeader) {
//     return <ReviewPanelBasic reviewBasicInput={reviewHeader} />;
//   }

//   return (
//     <Suspense fallback={<div>Loading 2 ... </div>}>
//       <ReviewHeaderLoader session={session} hotel={hotel}/>
//     </Suspense>
//   );
// }

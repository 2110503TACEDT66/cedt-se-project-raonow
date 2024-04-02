export default async function deleteBooking(token: string, id: string) {
    console.log("calling delete")
    
    try {
      const response = await fetch(
        `https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/booking/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
  
      return await response.json();
    } catch (error: any) {
       console.log(`Failed to fetch bookings: ${error.message}`);
    }
  }
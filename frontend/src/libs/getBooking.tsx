export default async function getBooking(token: string, id: string) {
    try {
      const response = await fetch(
        `https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/booking/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
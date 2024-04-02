export default async function createBooking(
    bookDate: Date,
    hotelId: string,
    duration: number,
    roomType: string,
    token: string,
    user: string,
    
  ) {
    try {
      const response = await fetch(
        `https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/hotel/${hotelId}/booking`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              bookDate: bookDate,
              duration: duration,
              hotel: hotelId,
              roomType: roomType,
              user:user
            }
          ),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }
'use server'
export default async function getBookings(token: string) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/booking`,
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
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }
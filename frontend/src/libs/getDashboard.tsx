'use server'
export default async function getDashboard(token: string) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/booking/dashboard`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch dashbaord");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch dashbaord: ${error.message}`);
    }
  }
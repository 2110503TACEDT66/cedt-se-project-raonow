'use server'
export default async function getCoupon(token: string, id: string) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/coupon/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch coupon");
      }
  
      return await response.json();
    } catch (error: any) {
      console.log(`Failed to fetch coupon: ${error.message}`);
    }
  }
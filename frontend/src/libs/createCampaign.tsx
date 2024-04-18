'use server'
export default async function createCampaign(
    token: string,  
    title: string,
    desc: string,
    point: number,
    onePerUser: boolean,
    discountType: string,
    discountAmount: number,
    limitedArea: null,
    totalAmount: number,
    duration: number
  ) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/campaign`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              title:title,
              description: desc,
              point: point,
              onePerUser: onePerUser,
              discountType: discountType,
              discountAmount: discountAmount,
              limitedArea: limitedArea,
              totalAmount: totalAmount,
              duration: duration
            }
          ),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch campaign");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch canpaign: ${error.message}`);
    }
  }
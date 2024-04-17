'use server'
export default async function getCampaign(token: string) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/campaign`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch campaigns");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to get campaigns: ${error.message}`);
    }
  }
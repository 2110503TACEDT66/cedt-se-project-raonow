'use server'
export default async function getCampaign(token: string, cid: string) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/campaign/${cid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch campaign");
      }
  
      return await response.json();
    } catch (error: any) {
      console.log(`Failed to get campaign: ${error.message}`);
    }
  }
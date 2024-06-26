'use server'
export default async function deleteCampaign(token: string, cid: string) {
    console.log("calling delete")
    
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/campaign/${cid}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch campaign");
      }
  
      return await response.json();
    } catch (error: any) {
       console.log(`Failed to delete campaign: ${error.message}`);
    }
  }
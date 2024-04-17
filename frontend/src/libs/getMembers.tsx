export default async function getMembers(token: string | undefined) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/member`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch Member");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch Member: ${error.message}`);
    }
  }
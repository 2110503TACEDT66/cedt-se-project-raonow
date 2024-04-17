export default async function createMember(
    token: string,
    user: string,
    address: string,
    province: string,
    birthday: string
    
  ) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/member`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              user:user,
              address: address,
              province: province,
              birthday: birthday
            }
          ),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch member");
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch member: ${error.message}`);
    }
  }
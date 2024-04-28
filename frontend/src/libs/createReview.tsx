import { ReviewCreating } from "../../interface";

export default async function createReview({token, review}: 
    {token: string, review: ReviewCreating}) {
    let backendUrl = window.location.origin;
    if (window.location.origin === "http://localhost:3000") backendUrl = "http://localhost:5000";
    try {
      const response = await fetch(
        `${backendUrl}/api/v1/hotel/${review.hotel}/reviews`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({review}),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch member");
      }

    } catch (error: any) {
      throw new Error(`Failed to fetch member: ${error.message}`);
    }
  }
"use server";
import getBackendURL from "./getBackendURL";

export default async function getReviewHeader({
  hotel,
}: {
  hotel: string;
}) {
  const backendUrl = getBackendURL();
  const url = `${backendUrl}/api/v1/hotel/${hotel}/reviews/header`;
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch review header");
  }
  return await response.json();
}

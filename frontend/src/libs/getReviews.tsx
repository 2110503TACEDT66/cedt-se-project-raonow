// 'use client'
'use server'
import { queryReview } from "../../interface";
import getBackendURL from "./getBackendURL";

export default async function getReviews({
  token,
  hotel,
  query,
}: {
  token?: string;
  hotel: string;
  query: queryReview;
}) {
  try {
    let queryList = [];
    if (query.id) {
      queryList.push(`id=${query.id}`);
    } else {
      if (query.date && query.date != "All time") {
        let date = new Date();
        switch (query.date) {
          case "Last month": date.setMonth(date.getMonth() - 1);
          case "Last 3 months": date.setMonth(date.getMonth() - 3);
          case "Last 6 months": date.setMonth(date.getMonth() - 6);
          case "Last year": date.setFullYear(date.getFullYear() - 1);
          queryList.push(`createdAt[gte]=${date.toISOString()}`);
        }
      }
      if (query.travelerType && query.travelerType != "Any") {
        queryList.push(`travelerType=${query.travelerType}`);
      }
      if (query.rating && query.rating.length > 0) {
        let ratingString = query.rating.join(",").replace("-", ",");
        queryList.push(`rating=${ratingString}`);
      }
      if (query.sort) {
        switch (query.sort) {
          case "Most revelant": queryList.push("sort=mostRelevant"); break;
          case "Most recent": queryList.push("sort=-createdAt"); break;
          case "Rating: high to low": queryList.push("sort=-rating"); break;
          case "Rating: low to high": queryList.push("sort=rating"); break;
          case "Oldest": queryList.push("sort=createdAt"); break;
        }
      }
      if (query.header) {
        queryList.push("header=1");
      }
      if (query.lastCheck) {
        queryList.push(`lastCheck=${query.lastCheck}`);
      }
    }
    const queryString = queryList.join("&");
    let backendUrl = getBackendURL();
    
    const url = `${backendUrl}/api/v1/hotel/${hotel}/reviews?${queryString}`;
    console.log(url);
    let headers = {};
    if (token) {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    }
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Failed to review");
    }

    return await response.json();
  } catch (error: any) {
    console.log(`Failed to review: ${error.message}`);
  }
}

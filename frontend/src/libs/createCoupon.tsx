'use server'

import { CouponJSON } from "../../interface";

export default async function createCoupon(
    token: string,
    campaign: string
  ) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/coupon`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              campaign: campaign,
            }
          ),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to create couepon");
      }
      return await response.json();

    } catch (error: any) {
      throw new Error(`Failed to create couepon: ${error.message}`);
    }
    return null;
  }
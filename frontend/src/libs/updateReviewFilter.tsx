'use server'

import { Session } from "next-auth";
import { ReviewFilter } from "../../interface";

export default async function updateReviewFilter({session, reviewFilter}: 
	{session:Session|null, reviewFilter: ReviewFilter}) {
	const thisSession = session;
	try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/users/${thisSession?.user.user._id}/reviewFilter`, {
					method: "PUT",
					headers: {
						authorization: `Bearer ${thisSession?.user.token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({reviewFilter})
			});

			if (!response.ok) {
					throw new Error("Failed to update review filter.");
			}

			return await response.json();
	} catch (error) {
			console.error(error);
	}
}
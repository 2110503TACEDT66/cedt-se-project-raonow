import { ReviewBasicJSON } from "../../interface";

export default async function ReviewPanelBasic({reviewBasicInput}: {reviewBasicInput: ReviewBasicJSON}) {
	const reviewInputJSON = reviewBasicInput;
	console.log(JSON.stringify(reviewInputJSON));
	const reviewBasic = reviewInputJSON.data;
  return (
    <div className="flex flex-col space-y-1 text-lg ">
			<div>Rating from users</div>
			<div className="flex flex-row items-end space-x-2 text-blue-600 ">
				<div className="text-4xl">{reviewBasic.averageRating.toFixed(1)}</div>
				<div>/ 5.0</div>
			</div>
			<div className="text-xl">Excellent</div>
			<div className="text-blue-600">From {reviewBasic.totalReviewCount} reviews</div>
	</div>
  )
}

import { ReviewBasicJSON } from "../../interface";

export default function ReviewPanelBasic({reviewBasicInput}: {reviewBasicInput: ReviewBasicJSON}) {
	const reviewInputJSON = reviewBasicInput;
	console.log(JSON.stringify(reviewInputJSON));
	if (!reviewInputJSON) return <div>Loading...</div>;
	const reviewBasic = reviewInputJSON.data;
	if (!reviewBasic) return <div>Not available</div>;
  	return (
    <div className="flex flex-col space-y-1 text-lg ">
		<div>Rating from users</div>
		<div className="flex flex-row items-end space-x-2 text-blue-600 ">
			<div className="text-4xl font-medium">{reviewBasic.averageRating.toFixed(1)}</div>
			<div>/ 5.0</div>
		</div>
		<div className="text-xl font-medium">Excellent</div>
		<div className="text-blue-600">From {reviewBasic.totalReviewCount} reviews</div>
	</div>
  )
}
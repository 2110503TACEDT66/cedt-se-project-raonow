import { ReviewFilter, ReviewList as ReviewListInterface } from "../../interface";
import ReviewCard from "@/components/ReviewCard";

export default async function ReviewList({ reviews, filter }:{ reviews: ReviewListInterface, filter: ReviewFilter}) {
  let reviewsData = reviews.data;
  if (reviewsData.length === 0) return null;
  if (filter.date && filter.date !== "All time") {
    if (filter.date === "Last month") {
      reviewsData = reviewsData.filter(review => new Date(review.createdAt) > new Date(new Date().setMonth(new Date().getMonth() - 1)));
    } else if (filter.date === "Last 3 months") {
      reviewsData = reviewsData.filter(review => new Date(review.createdAt) > new Date(new Date().setMonth(new Date().getMonth() - 3)));
    } else if (filter.date === "Last 6 months") {
      reviewsData = reviewsData.filter(review => new Date(review.createdAt) > new Date(new Date().setMonth(new Date().getMonth() - 6)));
    } else if (filter.date === "Last year") {
      reviewsData = reviewsData.filter(review => new Date(review.createdAt) > new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    }
  }
  if (filter.rating && filter.rating.length > 0) {
    reviewsData = reviewsData.filter(review => filter.rating.includes(review.rating));
  }
  if (filter.travelerType && filter.travelerType !== "Any") {
    reviewsData = reviewsData.filter(review => review.travelerType === filter.travelerType);
  }
  if (filter.sort) {
    if (filter.sort === "Most revelant") {
      reviewsData = reviewsData.sort((a, b) => a.rating - b.rating);
    } else if (filter.sort === "Most recent") {
      reviewsData = reviewsData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filter.sort === "Rating: high to low") {
      reviewsData = reviewsData.sort((a, b) => b.rating - a.rating);
    } else if (filter.sort === "Rating: low to high") {
      reviewsData = reviewsData.sort((a, b) => a.rating - b.rating);
    }
  }

  return (
    <div className="space-y-4">
      {reviewsData.map((review, index) => (
        <ReviewCard key={index} review={review} cardType="review" />
      ))}
    </div>
  )
}

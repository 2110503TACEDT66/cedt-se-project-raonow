"use client";
import getReviews from "@/libs/getReviews";
import { useState, useEffect, useRef, Suspense } from "react";
import ReviewList from "@/components/ReviewList";
import ReviewPanelBasic from "./ReviewPanelBasic";
import updateReviewFilter from "@/libs/updateReviewFilter";
import { Session } from "next-auth";
import { HotelItem, ReviewBasicJSON, ReviewFilter, ReviewList as ReviewListType, ReviewList as ReviewListInterface, travelerType as baseTravelerType, queryReview } from "../../interface";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, FormControlLabel, Checkbox, Snackbar, Alert } from "@mui/material";

//filter reviews by date, rating, and traveler type
export default function ReviewPanel({ session, hotel, viewType, header, reviews }: 
  { session: Session|null, hotel: HotelItem, viewType: string, header: ReviewBasicJSON, reviews: ReviewListInterface }) {
  let travelerType = baseTravelerType;
  const [values, setValues] = useState<ReviewFilter>({
    'date': 'All time',
    'rating': [] as number[],
    'travelerType': 'Any',
    'sort': 'Most revelant',
  });
  const isHotelier = viewType === 'hotelier';
  // const [reviews, setReviews] = useState<ReviewListType>();
  const [loading, setLoading] = useState(false);
  const [isSaveFilterSuccess, setIsSaveFilterSuccess] = useState(false);
  const [successPopUpText, setSuccessPopUpText] = useState('');
  const [useEffectCount, setUseEffectCount] = useState(0);
  const hasRun = useRef(false);

  const dateFilterSelect = [
    "Last month",
    "Last 3 months",
    "Last 6 months",
    "Last year",
    "All time",
  ];
  const sortFilterSelect = [
    "Most revelant",
    "Most recent",
    "Rating: high to low",
    "Rating: low to high",
  ];
  const ratingFilterSelect = {
    "5 Excellent": [5],
    "4 Good": [4,4.5],
    "3 Average": [3,3.5],
    "2 Below Expectation": [2,2.5],
    "1 Poor": [0,0.5,1,1.5],
  };

  const handleChange = (prop: keyof ReviewFilter) => (event: any) => {
    hasRun.current = false;
    //check if new value is different from old value
    if (values[prop] === event.target.value) return;
    setValues({ ...values, [prop]: event.target.value });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleRatingChange = (event: any, checked?: boolean) => {
    const ratingRange = JSON.parse(event.target.value);
    let newRating;
    hasRun.current = false;
    if (checked) {
      // If the checkbox is being checked, add the ratings in the checkbox's range to the rating array
      newRating = Array.from(new Set([...values.rating, ...ratingRange]));
    } else {
      // If the checkbox is being unchecked, remove the ratings in the checkbox's range from the rating array
      newRating = values.rating.filter(rating => !ratingRange.includes(rating));
    }
  
    setValues({ ...values, rating: newRating });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleUpdateReviewFilter = async () => {
    const response = await updateReviewFilter({session: session, reviewFilter: values});
    if (response.success) {
      setSuccessPopUpText('Review filter saved successfully!');
      setIsSaveFilterSuccess(true);
    }
  };

  const handleLoadReviewFilter = async () => {
    if (session?.user?.user?.reviewFilter) {
      setSuccessPopUpText('Review filteer loaded successfully!');
      setValues(await session?.user?.user?.reviewFilter);
    } else {
      setSuccessPopUpText('No review filter');
    }
    setIsSaveFilterSuccess(true);
  }

  const handlePopUpSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return; }
    setIsSaveFilterSuccess(false);
  }

  return (
    <div className="space-y-4">
      <div className="text-2xl font-semibold">
        Review of {hotel.name} from real guests
      </div>  

      <div className="flex flex-row ">
        <div className="flex flex-col w-1/3 border-r-2 pr-4 py-4 justify-between">
          <Suspense fallback={<div>Loading...</div>}>
            <ReviewPanelBasic reviewBasicInput={header} />
          </Suspense>
          <div className="flex flex-row space-x-2">
            <button className="w-1/2 bg-gray-100 hover:bg-gray-200 rounded-md py-1  justify-end"
            onClick={handleUpdateReviewFilter}>
              Save review filter
            </button>
            <button className="w-1/2 bg-gray-100 hover:bg-gray-200 rounded-md py-1  justify-end"
            onClick={handleLoadReviewFilter}>
              Load review filter
            </button>
          </div>
        </div>

        <div className="flex flex-col w-1/3 justify-between px-4 py-4">
          <FormControl className="w-full">
            <InputLabel id="dateFilter">Date</InputLabel>
            <Select id="dateFiler" value={values.date} input={<OutlinedInput label="Filter date from" />}
              onChange={handleChange('date')} fullWidth required>
              {dateFilterSelect.map((type) => (
              <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-full">
            <InputLabel id="travelerType">Traveler Type</InputLabel>
            <Select id="travelerType" value={values.travelerType} input={<OutlinedInput label="Traveler Type" />}
              onChange={handleChange('travelerType')} fullWidth required>
              <MenuItem value="Any">Any</MenuItem>
              {travelerType.map((type) => (
              <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className="w-full">
            <InputLabel id="sort">Sort by</InputLabel>
            <Select id="sort" value={values.sort} input={<OutlinedInput label="Sort" />}
              onChange={handleChange('sort')} fullWidth required>
              {sortFilterSelect.map((type) => (
              <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="w-1/3 border-l-2 pl-4 flex flex-col">
          <div>Rating</div>
          {Object.entries(ratingFilterSelect).map(([label, ratingRange]) => (
          <FormControlLabel 
            className="space-y-1 items-center"
            control={
              <Checkbox
                checked={values.rating.some(rating => ratingRange.includes(rating))}
                onChange={(event, checked)=>{handleRatingChange(event, checked)}}
                value={JSON.stringify(ratingRange)}
                size="medium"
              />
            }
            label={label}
            />
          ))}
        </div>
      </div>

      {
        !loading ?
        <Suspense fallback={<div>Loading...</div>}>
          <ReviewList reviews={reviews} filter={values}/>
        </Suspense> : <div>Loading...</div>
      }
      <Snackbar open={isSaveFilterSuccess} autoHideDuration={6000} onClose={handlePopUpSuccess}>
        <Alert
          onClose={handlePopUpSuccess}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successPopUpText}
        </Alert>
      </Snackbar>
    </div>
  );
}
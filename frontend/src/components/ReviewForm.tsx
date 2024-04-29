'use client'
import { CircularProgress, TextField, Button, FormControl, InputLabel, OutlinedInput, Select, 
  MenuItem, Rating, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@mui/material";
import { useState } from "react";
import createReview from "@/libs/createReview";
import { ReviewCreating, travelerType } from "../../interface";
import { Session } from "next-auth";
import Link from "next/link";

export default function ReviewForm({session, hotel, booking}:{session:Session, hotel:string, booking:string}) {
  const [values, setValues] = useState<ReviewCreating>({
    user: session.user.user._id, booking: booking, hotel: hotel,
    rating: 0,
    title: '',
    review: '',
    attitude: 'neutral',
    travelerType: " ",
  });
  const attitude = ['positive', 'neutral', 'negative'];
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitRatingZero, setSubmitRatingZero] = useState(false);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (!values.title || !values.review || !values.travelerType || values.travelerType === " ") {
      alert("Please fill in all fields");
      return;
    }
    if (values.rating === 0 && !submitRatingZero) {
      setLoading(false);
      setDialogOpen(true);
      return;
    }
    console.log(values);
    createReview({token: session.user.token, review: values}).then(data => {        
      setLoading(false);
      setIsReviewSubmitted(true);
    }).catch(error => {
      setLoading(false);
      alert("Cannot create review");
    });
  };

  if (isReviewSubmitted) return (
      <div className="flex flex-col text-center font-bold text-green-600 mt-4 pt-16 pb-32 text-xl">
        <div>Review complete!</div>
        <div>Thank you for your opinion!</div>
        <div className="flex justify-center space-x-6 mt-4 text-white font-medium">
          <Link href="/"><button type='button'
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-8         
              rounded flex items-center space-x-2'>Back home</button></Link>                       
          <Link href="/mybooking"><button type='button'
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-8
              rounded flex items-center space-x-2'>View booking</button></Link>
        </div>
      </div>
  )
  if (loading) return (
    <div className="items-center justify-center">
      <CircularProgress />
    </div>
  )
  return (
    <form onSubmit={handleSubmit} autoComplete="off" 
    className="justify-center pt-1 w-full text-base space-y-4 mx-auto">

      <div className="flex flex-row space-x-4 w-full items-center">
        <div className="flex flex-row space-x-2 w-1/3 text-lg">
          <div>Rating: </div>
          <Rating name="rating" max={5} precision={0.5} onChange={handleChange('rating')}/>
        </div>
        <FormControl className="w-1/3">
          <InputLabel id="travelerType">Traveler Type</InputLabel>
          <Select id="travelerType" value={values.travelerType} input={<OutlinedInput label="Traveler Type" />}
            onChange={handleChange('travelerType')} fullWidth required>
            <MenuItem value=" " disabled>Select Traveler Type</MenuItem>
            {travelerType.map((type) => (
            <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="w-1/3">
          <InputLabel id="attitude">Attitude</InputLabel>
          <Select id="attitude" value={values.attitude} input={<OutlinedInput label="Attitude" />}
            onChange={handleChange('attitude')} fullWidth required>
            <MenuItem value=" " disabled>Select Attitude Type</MenuItem>
            {attitude.map((type) => (
            <MenuItem key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TextField id="title" label="Title" value={values.title} onChange={handleChange('title')} fullWidth required/>
      
      <TextField id="review" label="Review" value={values.review} required onChange={handleChange('review')} 
      fullWidth minRows={3} multiline/>
      <button className="block mx-auto rounded-md bg-blue-500 hover:bg-indigo-500 px-3 py-2 
              text-white shadow-sm justify-center w-1/3" type="submit">Submit</button>

      <Dialog
        open={dialogOpen}
        onClose={()=>{setDialogOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to submit a 0 star rating??"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={()=>{setDialogOpen(false)}}>Cancel</Button>
          <Button onClick={()=>{setDialogOpen(false); setSubmitRatingZero(true);}} autoFocus type="submit">Confirm</Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}
//()=>{setDialogOpen(false); setSubmitRatingZero(true)

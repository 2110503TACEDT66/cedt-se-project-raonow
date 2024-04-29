'use client'
import { useState, useEffect } from 'react';
import { Snackbar, Alert} from '@mui/material';
import getReviews from '@/libs/getReviews';

export default function HotelierNotification({token, hotel}:{token:string, hotel:string}) {
  const [isNewAlert, setIsNewAlert] = useState(false);
  const [testEffect, setTestEffect] = useState(1);
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') { return; }
    setIsNewAlert(false);
  }

  useEffect(() => {
    //set time in localstorage to be now
    const lastCheck = localStorage.getItem('lastCheck');
    const currentTime = new Date();
    localStorage.setItem('lastCheck', currentTime.toISOString());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const lastCheck = localStorage.getItem('lastCheck');
      try {
        getReviews({token, hotel, query: {lastCheck: lastCheck||""}}).then((data) => {
          if (data.success) 
            setIsNewAlert(true);
        });
        localStorage.setItem('lastCheck', new Date().toISOString());
      } catch (error) {
        console.error(error);
      }
      setTestEffect(testEffect+1);
    }, 5000); // Runs every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, ); 

  return (
    <div>
      {/* <div className='justify-center'>text {testEffect}</div> */}
    <Snackbar 
      open={isNewAlert} autoHideDuration={6000} onClose={handleCloseAlert}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert
        onClose={handleCloseAlert}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        There is a new review incoming!
      </Alert>
    </Snackbar>
    </div>
)
}

import { Rating } from '@mui/material';
import { styled } from '@mui/system';

const StarRating = styled(Rating)(({ theme }) => ({
    // Hide the gray stars when the value is not set
    '.MuiRating-iconEmpty': {
      display: 'none',
    },
}));

export default StarRating;
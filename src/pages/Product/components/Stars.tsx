import Rating from '@mui/material/Rating';

const Stars = ({rating}) => {

  return (
   <>
    <Rating
    name="simple-controlled"
    value={rating}
    />    
</>
  )
}

export default Stars

import Rating from '@mui/material/Rating';
type Stars = { rating: number}
const Stars = ({rating}: Stars) => {

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

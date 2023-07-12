import { useContext } from 'react';
import { UserContext } from '../auth/UserContext';
// import 'Home.css'

const Home = () => {    

  const { user } = useContext(UserContext);;

  return (
    <>
     <p>Hi, {user.displayName}</p> 
     <h1>What are you looking for today?</h1>
    </>
  )
}

export default Home

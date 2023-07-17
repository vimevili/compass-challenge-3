// import { UserContext } from '../../auth/UserContext';
import styles from './Home.module.css'
import MainProducts from './MainProducts';
import {Link} from 'react-router-dom'

const Home = () => {    
  // const { user } = useContext(UserContext);

  return (
    <div className={styles.body}>
     {/* <p>Hi, {user.displayName}</p>  */}
     <div className={styles.header}>
       <p className={styles.subtitulo}>Hi, Andrea</p>
       <h1 className={styles.titulo}>What are you looking for today?</h1>
     </div>

     {/* SEARCH BAR */}
     <Link to='/search' className={styles.link}>
        <div className={styles.inputs}>
          <img src="public/images/icon-search.svg" id='img-lock' alt="" />
          <input
            type="search"
            placeholder="Search headphone"
          />
        </div>
      </Link>
     <MainProducts />
    </div>
  )
}

export default Home

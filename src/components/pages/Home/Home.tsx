// import { UserContext } from '../../auth/UserContext';
import SearchBar from '../Search/SearchBar'
import styles from './Home.module.css'
import MainProducts from './MainProducts';

const Home = () => {    
  // const { user } = useContext(UserContext);

  return (
    <div className={styles.body}>
     {/* <p>Hi, {user.displayName}</p>  */}
     <div className={styles.header}>
       <p className={styles.subtitulo}>Hi, Andrea</p>
       <h1 className={styles.titulo}>What are you looking for today?</h1>
     </div>
     <SearchBar />
     <MainProducts />
    </div>
  )
}

export default Home

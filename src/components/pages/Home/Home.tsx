import styles from './Home.module.css'
import MainProducts from './MainProducts';
import {Link} from 'react-router-dom'
import  Menu  from './Menu/Menu';

const Home = ({user}) => {  
  const socialUser = user.displayName
  const userName = user && socialUser ? socialUser : 'user'
  return (
      <div className={styles.body}>
          <div className={styles.buttonsHeader}>
            <Menu user={user}/>
          </div>
          <div className={styles.header}>
            <p className={styles.subtitulo}>Hi, {userName}</p> 
            <h1 className={styles.titulo}>What are you looking for today?</h1>
          </div>
          {/* SEARCH BAR */}
          <Link to='/search' className={styles.link}>
              <div className={styles.inputs}>
                <img src="/src/assets/search.svg" id='img-lock' alt="" />
                <input
                  type="search"
                  placeholder="Search headphone"
                />
              </div>
          </Link>
        <MainProducts />
      </div >
  )
}

export default Home

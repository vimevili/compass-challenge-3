import styles from './Home.module.css'
import MainProducts from './components/MainProducts';
import {Link} from 'react-router-dom'
import  Menu  from './components/Menu';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {  motion  } from 'framer-motion';

const Home = () => {  
  const {user} = useContext(UserContext)
  const socialUser: string = user && typeof user.displayName === 'string' ? user.displayName : '';
  const userName: string = user && socialUser ? socialUser : 'user'

  return (
      <motion.div initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }} className={styles.body}>
            <div className={styles.buttonsHeader}>
              <Menu />
            </div>
            <div className={styles.home}>
              <div className={styles.header}>
                <p className={styles.subtitulo}>Hi, {userName}</p>
                <h1 className={styles.titulo}>What are you looking for today?</h1>
              </div>
              {/* SEARCH BAR */}
              <Link to='/search' className={styles.link}>
                  <button className={styles.inputs}>
                    <img src="/src/assets/images/search.svg" id='img-lock' alt="" />
                    <input
                      type="search"
                      placeholder="Search headphone"
                    />
                  </button>
              </Link>
            </div>
            
            <div className={styles.cardContainer}><p className={styles.cardText}>In all sizes</p></div>
          <MainProducts />
      </motion.div>
  )
}

export default Home

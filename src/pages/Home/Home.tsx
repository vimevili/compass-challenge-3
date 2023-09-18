import styles from './Home.module.css'
import MainProducts from './components/MainProducts';
import {Link} from 'react-router-dom'
import  Menu  from './components/Menu';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {  motion  } from 'framer-motion';
import { useMediaQuery } from '@mui/material';
import Navbar from './components/DesktopComponents/Navbar';
import HomeProducts from './components/DesktopComponents/HomeProducts';

const Home = () => {  
  const {user} = useContext(UserContext)
  const socialUser: string = user && typeof user.displayName === 'string' ? user.displayName : '';
  const userName: string = user && socialUser ? socialUser : 'user'

  const isDesktop = useMediaQuery('(min-width:1025px)')


  return (
      <motion.div initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }} className={styles.body}>

            {!isDesktop ? 
            <>
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
            </> 
            : 
            <>
              <Navbar />
              <div className={styles.desktopBody}>
                <HomeProducts />
                <ul className={styles.cardsContainer}>
                  <li><img src="/src/assets/images/card-1.png" alt="" /><p>All our products</p></li>
                  <li><img src="/src/assets/images/card-2.png" alt="" /><p>To all people</p></li>
                  <li><img src="/src/assets/images/card-3.png" alt="" /><p>In all sizes</p></li>
                </ul>
              </div>

            </>
            
            }

          
      </motion.div>
  )
}

export default Home

import styles from './Home.module.css'
import MainProducts from './MainProducts';
import {Link} from 'react-router-dom'
import { motion} from 'framer-motion'
import { useRef, useState } from 'react';
import  Menu  from './Menu/Menu';

const Home = () => {   
  return (
    <motion.div 
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '-100%' }}
    transition={{ duration: 0.5 }}
    layout>
      <div className={styles.body}>
        <div className={styles.header}>
          <Menu />
        <p className={styles.subtitulo}>Hi, Vinicius</p> 
          {/* <p >Hi, Andrea</p> */}
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
    </motion.div>
  )
}

export default Home

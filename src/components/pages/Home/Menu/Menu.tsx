import {useRef, useState} from 'react'
import styles from './Menu.module.css'
import { useNavigate } from 'react-router-dom'
import { motion} from 'framer-motion'
import Loading from '../../Loading/Loading'

const Menu = () => {
    const menuRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    function logOut() {
        setLoading(true)
        localStorage.removeItem('userEmail');
        setTimeout(() => {
            setLoading(false)
            navigate('/')
          }, 1500);   
    }
  return (
    <div className={styles.body}>
        {loading && <Loading />}
        <button className={styles.menu} onClick={()=> setIsOpen(!isOpen)}><img src="/src/assets/menu.svg" alt="" /></button>

        {isOpen ? 
        <motion.div initial={{  x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%'}}
        transition={{ duration: .5 }}
        >
            <nav ref={menuRef} className={isOpen ? styles.open : styles.close}>
                <button onClick={()=> setIsOpen(!isOpen)} className={styles.exitButton}><img src="/src/assets/exit.svg" alt="" /></button>
            
                    <ul className={styles.menuContainer}>
                        <button onClick={() => navigate('/home')}><img src="/src/assets/home.svg" alt="" />Home</button>
                        <button onClick={() => navigate('/products')}><img src="/src/assets/headphone-icon.svg" alt="" />Products</button>
                        <button onClick={() => navigate('/cart')}><img src="/src/assets/shopping-cart.svg" alt="" />Cart</button>
                        <button onClick={() => logOut()}><img src="/src/assets/log-out.svg" alt="" />LogOut</button>
                    </ul>
            
            </nav>
        </motion.div> : null}
    </div>
  )
}

export default Menu

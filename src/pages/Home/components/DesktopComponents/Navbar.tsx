import {useContext} from 'react'
import styles from './Navbar.module.css'
import { UserContext } from '../../../../contexts/UserContext';

const Navbar = () => {

  const {user} = useContext(UserContext) 
  const socialUser: string = user && typeof user.displayName === 'string' ? user.displayName : '';
  
  return (
    <div className={styles.body}>
        <div className={styles.logo}>
            <img src="/src/assets/images/logo-audio.svg" alt="" />
            <h1 className={styles.logoText}>Audio</h1>
        </div>
        <ul className={styles.container}>
            <li className={styles.linkContainer}>
                <img src="/src/assets/images/help-icon.svg" alt="" />
                <p>Help</p>
            </li>
            <li className={styles.linkContainer}>
                <img src="/src/assets/images/bell-icon.svg" alt="" />
                <p>Notifications</p>
            </li>
            <li className={styles.linkContainer}>
                <img src="/src/assets/images/wish-icon.svg" alt="" />
                <p>Wish List</p>
            </li>
            <li className={styles.linkContainer}>
                <img src="/src/assets/images/shopping-cart.svg" alt="" />
                <p>Cart</p>
            </li>
            <li className={styles.linkContainer}>
                <img src={socialUser && user ? user.photoURL! : '/src/assets/images/user-profile.svg'} alt="" className={styles.userPhoto}/>
            </li>
        </ul>
    </div>
  )
}

export default Navbar

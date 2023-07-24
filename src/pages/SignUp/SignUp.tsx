import {Link } from 'react-router-dom'
import styles from './SignUp.module.css'
import {useContext} from 'react'
import Swal from 'sweetalert2';
import { UserContext } from "../../contexts/UserContext";
import Form from '../../components/Form';

const SignUp = () => {

  const {signInWithGoogle, 
    signInWithFacebook,
    error,
    passwordError,
    emailError } = useContext(UserContext)

  return (
    <>
        {!emailError && !passwordError && error && Swal.fire({
          title: 'Oops...',
          text: error
        })}
      <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.titulo}>Audio</h1>
            <p className={styles.subtitulo}>It's modular and designed to last</p>
          </div>

          <Form type={'Up'} />

          <ul className={styles.socialContainer}>
            <li><button onClick={signInWithFacebook} className={styles.socialButton}><img src="/src/assets/images/facebook.svg" alt="" /></button></li>
            <li><button onClick={signInWithGoogle} className={styles.socialButton}><img src="/src/assets/images/google.svg" className={styles.google} alt="" /></button></li> 
          </ul>
          <p style={{paddingTop: '1.5rem'}}>If you have an account, <Link to='/' style={{color: '#0ACF83'}}>Sing In here</Link></p>
    </div>
    </>
  )
}


export default SignUp
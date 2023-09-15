import {useNavigate } from 'react-router-dom'
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
    emailError, setError, setEmail, setPassword } = useContext(UserContext)
    
    const navigate = useNavigate()

    const handleClick = () => {
      setError('')
      setEmail('')
      setPassword('')
      navigate('/')    
    }

  return (
    <>
        {!emailError && !passwordError && error && Swal.fire({
          title: 'Oops...',
          text: error
        })}
      <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.form}>
            <div className={styles.marca}>
              <div className={styles.logo}>
                <img src="/src/assets/images/logo-audio.svg" alt="" />
                <h1>Audio</h1>
              </div>
              <h2>It's modular and designed to last</h2>
            </div>
              <div className={styles.header}>
                <h1 className={styles.titulo}>Audio</h1>
                <p className={styles.subtitulo}>It's modular and designed to last</p>
              </div>
              <div>
                <Form type={'Up'} />
                <ul className={styles.socialContainer}>
                  <li><button onClick={signInWithFacebook} className={styles.socialButton}><img src="/src/assets/images/github.svg" alt="" className={styles.github}/></button></li>
                  <li><button onClick={signInWithFacebook} className={styles.socialButton}><img src="/src/assets/images/facebook.svg" alt="" className={styles.facebook}/></button></li>
                  <li><button onClick={signInWithGoogle} className={styles.socialButton}><img src="/src/assets/images/google.svg" className={styles.google} alt="" /></button></li>
                </ul>
                <p style={{paddingTop: '1.5rem'}}>If you have an account, <button className={styles.button} onClick={handleClick}>Sing In here</button></p>
              </div>
            </div>
          </div>
      </div>
    </>
  )
}


export default SignUp

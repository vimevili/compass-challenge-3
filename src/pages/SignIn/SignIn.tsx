import { useNavigate} from 'react-router-dom'
import styles from './SignIn.module.css'
import {useContext } from 'react'
import Swal from 'sweetalert2';
import Loading from "../../components/Loading/Loading";
import { UserContext } from "../../contexts/UserContext";
import Form from '../../components/Form';

const SignUp = () => {
  const {loadingUser, 
    error,
    passwordError,
    emailError, setError, setEmail, setPassword, signInWithFacebook, signInWithGoogle } = useContext(UserContext)

  const navigate = useNavigate()

  const showErrorPopUp = () => {
    Swal.fire({
      title: 'Oops...',
      text: error
    }).then(() => {
      console.log();      
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleClick = () => {
    setError('')
    setEmail('')
    setPassword('')
    navigate('/sign-up')    
  }

  return (
    <>
    {loadingUser && <Loading signout={false}/>}
    {!emailError && !passwordError && error && showErrorPopUp()}
      <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.titulo}>Audio</h1>
            <p className={styles.subtitulo}>It's modular and designed to last</p>
          </div>
            
         <Form type={'In'}/>

         <ul className={styles.socialContainer}>
            <li><button onClick={signInWithFacebook} className={styles.socialButton}><img src="/src/assets/images/facebook.svg" alt="" /></button></li>
            <li><button onClick={signInWithGoogle} className={styles.socialButton}><img src="/src/assets/images/google.svg" className={styles.google} alt="" /></button></li> 
          </ul>

          <div className={styles.signinContainer}>
              <p style={{paddingTop: '.7rem'}}>Didn't have any account? <button onClick={handleClick} className={styles.singup}>Sing Up here</button></p>
          </div>
    </div>
    </>
  )
}

export default SignUp

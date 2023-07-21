import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { Link, useNavigate} from 'react-router-dom'
import styles from './SignIn.module.css'
import {useState} from 'react'
import verifyError from './verifyError'
import Swal from 'sweetalert2';
import Loading from "../Loading/Loading";

const SignUp = ({setUser}) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const passwordError = error && error.includes('password') ? error : '';
  const emailError = error && error.includes('email') ? error : '';
  const navigate = useNavigate()
  
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setUser(userCredential.user)
        setError('')
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate('/home');
        }, 1500);
      })
      .catch((error) => {
        const errorMessage = verifyError(error.code);
        setError(errorMessage)
      });
  };

  function validateEmail(email) {
    setUserEmail(email)
    if ((/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email))) {
      setError('')
    } else {
      setError('An email must have this format: test@test.com')
    }
  }

  function validatePassword(password) {
    setUserPassword(password)
    if (password.length >= 6) {
      setError('')
    }
  }
  
  return (
    <>
    {loading && <Loading />}
    {!emailError && !passwordError && error && Swal.fire({
      title: 'Oops...',
      text: error
    })}
      <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.titulo}>Audio</h1>
            <p className={styles.subtitulo}>It's modular and designed to last</p>
          </div>
            
         <form onSubmit={(e) => signIn(e)}>
             <div className={styles.inputs}>
             <div className={!emailError ? styles.flex : styles.errorFlex}>
               <img src="/src/assets/email.svg" id='img-mail' alt="" />
               <input
                 placeholder='Email'
                 type="email"
                 name="email"
                 onChange={({target}) => validateEmail(target.value)}
                 value={userEmail}
                 className={!emailError ? styles.input : styles.errorInput}
               />
             </div>
             <span className={styles.spanEmail}>{error.includes('email') && emailError}</span>

             <div className={!passwordError ? styles.flex : styles.errorFlex}>
               <img src="/src/assets/lock.svg" id='img-lock' alt="" />
               <input
                 placeholder='Password'
                 type="password"
                 name="password"
                 onChange={({target}) => validatePassword(target.value)}
                 value={userPassword}
                 className={!passwordError ? styles.input : styles.errorInput}
               />
             </div>
             <span className={styles.spanPassword}>{error.includes('password') && passwordError}</span>
             <button type="submit" className={styles.signButton}>
               Sign In
             </button>
         </div>
           </form>

          <div className={styles.signinContainer}>
              <p style={{paddingTop: '1.5rem'}}>Didn't have any account? <button onClick={() => navigate('/sign-up')} className={styles.singup}>Sing Up here</button></p>
          </div>
    </div>
    </>
  )
}

export default SignUp

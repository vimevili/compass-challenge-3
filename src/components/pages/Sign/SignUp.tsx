import {Link, useNavigate} from 'react-router-dom'
import styles from './SignUp.module.css'
import { createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../services/firebase";
import {useState} from 'react'
import verifyError from './verifyError'
import Swal from 'sweetalert2';

const SignUp = ({setUser}) => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState('')
  const passwordError = error && error.includes('password') ? error : '';
  const emailError = error && error.includes('email') ? error : '';
  const navigate = useNavigate()
  
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
      setUser(userCredential.user)
      setError('')
      navigate('/home')
    })
    .catch((error) => {
      const errorMessage = verifyError(error.code);
      setError(errorMessage)
    });
  };

  // Google authentication
  const googleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn=(e)=>{
    e.preventDefault();
    signInWithPopup(auth, googleProvider).then((result)=>{
      const user = result.user;
      setUser(user);
      navigate('/home')
    }).catch((error)=>{
      const errorMessage = verifyError(error.code);
      setError(errorMessage)
    })
  }

// Facebook authentication
const facebookProvider = new FacebookAuthProvider();

const handleFacebookSignIn=(e)=>{
  e.preventDefault()
  signInWithPopup(auth, facebookProvider).then((result)=>{
    const user = result.user;
    setUser(user);
    navigate('/home')
  }).catch((error)=>{
    const errorMessage = verifyError(error.code);
      setError(errorMessage)
  })
}

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
        {!emailError && !passwordError && error && Swal.fire({
          title: 'Oops...',
          text: error
        })}
      <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.titulo}>Audio</h1>
            <p className={styles.subtitulo}>It's modular and designed to last</p>
          </div>

          <form onSubmit={(e) => signUp(e)}>
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

          <ul className={styles.socialContainer}>
            <li><button onClick={handleFacebookSignIn} className={styles.socialButton}><img src="/src/assets/facebook.svg" alt="" /></button></li>
            <li><button onClick={handleGoogleSignIn} className={styles.socialButton}><img src="/src/assets/google.svg" className={styles.google} alt="" /></button></li> 
          </ul>
          <p style={{paddingTop: '1.5rem'}}>If you have an account, <Link to='/' style={{color: '#0ACF83'}}>Sing In here</Link></p>
    </div>
    </>
  )
}


export default SignUp

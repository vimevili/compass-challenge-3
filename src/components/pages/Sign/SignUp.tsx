import {Link, useNavigate} from 'react-router-dom'
import styles from './SignUp.module.css'
import { createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../../services/firebase";
import {useState} from 'react'
import  {Formik}  from 'formik';

const SignUp = () => {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [error, setError] = useState('')
  const passwordError = error && error.includes('password') ? error : '';
  const emailError = error && error.includes('email') ? error : '';
  const [user, setUser] = useState()
  const navigate = useNavigate()
  console.log(emailError);
  
  const signUp = () => {
    createUserWithEmailAndPassword(auth, userEmail, userPassword).then((userCredential) => {
      setUser(userCredential.user)
      setError('')
      navigate('/home')
    })
    .catch((error) => {
      const errorMessage = error.code;
      setError(errorMessage)
    });
  };


  // Google authentication
  const googleProvider = new GoogleAuthProvider();


  const handleGoogleSignIn=()=>{
    signInWithPopup(auth, googleProvider).then((result)=>{
      const user = result.user;
      console.log(user);
      setUser(user);
    }).catch((err)=>{
      console.log(err);
    })
  }

// Facebook authentication
const facebookProvider = new FacebookAuthProvider();

const handleFacebookSignIn=()=>{
  signInWithPopup(auth, facebookProvider).then((result)=>{
    const user = result.user;
    console.log(user);

  }).catch((err)=>{
    console.log(err);
  })
}

  return (
      <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.titulo}>Audio</h1>
            <p className={styles.subtitulo}>It's modular and designed to last</p>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              setUserEmail(values.email)
              setUserPassword(values.password)
              const errors = {};
                if (!values.email) {
                  errors.email = 'You must provide your email';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                  errors.email = 'Invalid email address';
                } else if (emailError === 'auth/email-already-in-use') {
                  errors.email = 'This email is already registered';
                }
              
                if (!values.password) {
                  errors.password = 'You must provide a password';
                } else if (passwordError === 'auth/weak-password') {
                  errors.password = 'Your password must be at least 6 characters long';
                } 
                return errors;
              }}

            onSubmit={() => {
              signUp();
              }}
              >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit}>
             <div className={styles.inputs}>
             <div className={!errors.email ? styles.flex : styles.errorFlex}>
               <img src="/src/assets/email.svg" id='img-mail' alt="" />
               <input
                 placeholder='Email'
                 type="email"
                 name="email"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.email}
                 className={!errors.email ? styles.input : styles.errorInput}
               />
             </div>
             <div className={styles.emailError}>{errors.email && touched.email && errors.email}</div>
             <div className={!errors.password ? styles.flex : styles.errorFlex}>
               <img src="/src/assets/lock.svg" id='img-lock' alt="" />
               <input
                 placeholder='Password'
                 type="password"
                 name="password"
                 onChange={handleChange}
                 onBlur={handleBlur}
                 value={values.password}
                 className={!errors.password ? styles.input : styles.errorInput}
               />
             </div>
             <div className={styles.passwordError}>{errors.password && touched.password && errors.password}</div>
             <button type="submit" disabled={isSubmitting} className={styles.signButton}>
               Sign Up
             </button>
              </div>
           </form>
       )}
     </Formik>
          <ul className={styles.socialContainer}>
            <li><button onClick={handleFacebookSignIn} className={styles.socialButton}><img src="/src/assets/facebook.svg" alt="" /></button></li>
            <li><button onClick={handleGoogleSignIn} className={styles.socialButton}><img src="/src/assets/google.svg" className={styles.google} alt="" /></button></li> 
          </ul>
          <p style={{paddingTop: '1.5rem'}}>If you have an account, <Link to='/' style={{color: '#0ACF83'}}>Sing In here</Link></p>
    </div>
  )
}


export default SignUp

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { Link, useNavigate} from 'react-router-dom'
import styles from './SignIn.module.css'
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
  console.log(emailError, passwordError);
  
  const signIn = () => {
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        setUser(userCredential.user)
        localStorage.setItem('userEmail', userCredential.user.email);
        setError('')
        navigate('/home')
      })
      .catch((error) => {
        const errorMessage = error.code;
        setError(errorMessage)
      });
  };
  
  return (
    <>
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
                } else if (emailError === 'auth/user-not-found') {
                  errors.email = 'There is no user with this email';
                }
              
                if (!values.password) {
                  errors.password = 'You must provide a password';
                } else if (passwordError === 'auth/weak-password') {
                  errors.password = 'Your password must be at least 6 characters long';
                } else if (passwordError === 'auth/wrong-password') {
                  errors.password = 'Incorrect password';
                }
                return errors;
              }}

       onSubmit={() => {
         signIn();
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
               Sign In
             </button>
         </div>
           </form>
       )}
     </Formik>
     <div className={styles.signinContainer}>
                <p style={{paddingTop: '1.5rem'}}>Didn't have any account? <Link to='/sign-up' className={styles.singup}>Sing Up here</Link></p>
            </div>
    </div>
    </>
  )
}

export default SignUp

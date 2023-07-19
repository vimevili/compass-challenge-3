import {Link} from 'react-router-dom'
import styles from './SignUp.module.css'
import { createUserWithEmailAndPassword, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "../../../services/firebase";
import {useState, useEffect} from 'react'
import { UserContext } from '../../../contexts/UserContext';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {SignInWithGoogle} = useContext(UserContext)

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [emailValue, setEmailValue] = useState('')

  useEffect(()=>{
    setEmailValue(localStorage.getItem('email'))
  }, [])
  // Google authentication
  const googleProvider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);

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

          <form>
            <div className={styles.inputs}>

                <div className={styles.flex}>
                    <img src="/src/assets/email.svg" id='img-mail' alt="" />
                    <input type="email" placeholder='Email' id='email' onChange={({target}) => setEmail(target.value)}/>
                </div>

                <div className={styles.flex}>
                    <img src="/src/assets/lock.svg" id='img-lock' alt="" />
                    <input type="password" placeholder='Password' id='password' onChange={({target}) => setPassword(target.value)}/>
                </div>

                {/* <Link to='/home'> */}
                  <button onClick={signUp} className={styles.signButton}>Sign Up</button>
                {/* </Link> */}
                    <ul className={styles.socialContainer}>
                        <li><button onClick={handleFacebookSignIn} className={styles.socialButton}><img src="/src/assets/facebook.svg" alt="" /></button></li>
                        <li><button onClick={handleGoogleSignIn} className={styles.socialButton}><img src="/src/assets/google.svg" className={styles.google} alt="" /></button></li> 
                    </ul>
            <p>If you have an account, <Link to='/' style={{color: '#0ACF83'}}>Sing In here</Link></p>
            </div>
          </form>
    </div>
  )
}


export default SignUp

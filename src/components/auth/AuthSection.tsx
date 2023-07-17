import { useState } from 'react';
import styles from './AuthSection.module.css'
import {Link} from 'react-router-dom'

const AuthSection = ({type}) => {
    
//   const { signUp, signInWithGoogle, signInWithFacebook, logOut, user, setEmail, setPassword } =  useContext(UserContext);
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Default authentication
  const signUp = (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
          setUser(result.user);
      })
      .catch((err) => {
          console.log(err);
      });
  };
  // Google authentication
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Facebook authentication
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
    
  return (
    <div className={styles.body}>
        <h1 className={styles.titulo}>Audio</h1>
        <p className={styles.subtitulo}>It's modular and designed to last</p>

        <form>
        <div className={styles.inputs}>

            <div className={styles.flex}>
                <img src="public/images/icon-mail.svg" id='img-mail' alt="" />
                <input type="email" placeholder='Email' id='email' onChange={({target}) => setEmail(target.value)}/>
            </div>

            <div className={styles.flex}>
                <img src="public/images/icon-lock.svg" id='img-lock' alt="" />
                <input type="password" placeholder='Password' id='password' onChange={({target}) => setPassword(target.value)}/>
            </div>

            {type === 'Up' && 
            <>
            <Link to='/home'>
              <button onClick={signUp} className={styles.signButton}>Sign Up</button>
            </Link>
                <ul className={styles.socialContainer}>
                    <li><a onClick={signInWithFacebook}><img src="public/images/facebook.svg" alt="" /></a></li>
                    <li><a onClick={signInWithGoogle}><img src="public/images/google.svg" className={styles.google} alt="" /></a></li>
                </ul>
            </>
            }

        </div>
        {type === 'In' &&  <>
        <div className={styles.signinContainer}>
            <a href="" className={styles.forgot}>Forgot Password</a>
            {/* <button onClick={console.log('oi')}>Sign In</button> */}
            <button className={styles.signButton}>Sign In</button>
            <p className={styles.signPara}>Didn't have any account? <a href="" className={styles.singup}>Sing Up here</a></p>
        </div>
        </>
        }
        </form>
    </div>
  )
}

export default AuthSection

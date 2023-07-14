import { useContext } from 'react';
import { UserContext } from './UserContext';
import styles from './AuthSection.module.css'

const AuthSection = ({type}) => {
    
    const { signUp, signInWithGoogle, signInWithFacebook, logOut, user, setEmail, setPassword } =  useContext(UserContext);

  return (
    <>
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
                <button onClick={signUp} className={styles.signButton}>Sign Up</button>
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
    </>
  )
}

export default AuthSection

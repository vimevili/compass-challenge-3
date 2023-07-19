import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import {Link} from 'react-router-dom'
import styles from './SignIn.module.css'
import {useState} from 'react'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
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
                <button className={styles.forgot}>Forgot Password</button>
            </div>  

            <div className={styles.signinContainer}>
                  <button onClick={signIn} className={styles.signButton}>Sign In</button>
                <p className={styles.signPara}>Didn't have any account? <Link to='/sign-up' className={styles.singup}>Sing Up here</Link></p>
            </div>
          </form>
    </div>
    </>
  )
}

export default SignUp

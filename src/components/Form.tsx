import {MouseEventHandler, useContext } from 'react'
import styles from './Form.module.css';
import { UserContext } from "../contexts/UserContext";
import {Link} from 'react-router-dom'
type Props = {type: string}

const Form = ({type}: Props) => {

  const {email,
        password, 
        signIn,
        signUp,
        validateEmail,
        validatePassword,
        error,
        passwordError,
        emailError } = useContext(UserContext)  
    
  function handleSubmit(e: MouseEventHandler<HTMLButtonElement>): void {
    if (type === 'In') {
      signIn(e)
    }
    signUp(e)
  }      
  
  return (

    <form>
             <div className={styles.inputs}>
             <div className={!emailError ? styles.flex : styles.errorFlex}>
               <img src="/src/assets/images/email.svg" id='img-mail' alt="" />
               <input
                 placeholder='Email'
                 type="email"
                 name="email"
                 onChange={({target}) => validateEmail(target.value)}
                 value={email}
                 className={!emailError ? styles.input : styles.errorInput}
               />
             </div>
             <span className={styles.spanEmail}>{error.includes('email') && emailError}</span>

             <div className={!passwordError ? styles.flex : styles.errorFlex}>
               <img src="/src/assets/images/lock.svg" id='img-lock' alt="" />
               <input
                 placeholder='Password'
                 type="password"
                 name="password"
                 onChange={({target}) => validatePassword(target.value)}
                 value={password}
                 className={!passwordError ? styles.input : styles.errorInput}
               />
             </div>
             <span className={styles.spanPassword}>{error.includes('password') && passwordError}</span>
             {type==='In' && <Link to='/forgot' className={styles.forgot}>Forgot Password</Link>}
             <button onClick={() => void handleSubmit} className={styles.signButton}>
               Sign {type}
             </button>
         </div>
           </form>
  )
}

export default Form

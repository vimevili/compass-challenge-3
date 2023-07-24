import {useContext } from 'react'
import styles from './Form.module.css'
import { UserContext } from "../contexts/UserContext";

const Form = ({type}) => {

  const {email,
        password, 
        signIn,
        validateEmail,
        validatePassword,
        error,
        passwordError,
        emailError } = useContext(UserContext)  
    
  function handleSubmit(e) {
    if (type === 'In') {
      signIn(e)
    }
    signUp(e)
  }      
  return (

    <form onSubmit={(e) => handleSubmit(e)}>
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
             <button type="submit" className={styles.signButton}>
               Sign {type}
             </button>
         </div>
           </form>
  )
}

export default Form

import {FormEvent, useContext } from 'react'
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
    
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    type === 'In' ? signIn(e) : signUp(e)
  }      
  console.log(passwordError);
  console.log(emailError);
  console.log(error);


  return (

    <form onSubmit={handleSubmit}>

             <div className={styles.inputs}>
                <h2 className={styles.signTitle}>{type === 'In' ? 'Sign In' : 'Sign Up'}</h2>

             <div style={{textAlign: 'start'}}>
               <div>
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
                 <span style={{display: 'none'}} className={emailError && type === 'In' ? styles.spanEmailSignIn : styles.spanEmailSignUp}>
                  {error.includes('email') && emailError}
                 </span>
               </div>
               <div>
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
                 <span style={{display: 'none'}} className={passwordError && type === 'In' ? styles.spanPasswordSignIn : styles.spanPasswordSignUp}>
                  {error.includes('password') && passwordError}
                 </span>
               </div>
             </div>
             
             {type==='In' && <Link to='/forgot' className={styles.forgot}>Forgot Password</Link>}

             <button className={styles.signButton}>
               Sign {type}
             </button>
         </div>
           </form>
  )
}

export default Form

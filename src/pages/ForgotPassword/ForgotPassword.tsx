import { useState, FormEvent} from 'react'
import styles from './ForgotPassword.module.css'
import { auth } from '../../services/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import verifyError from '../../contexts/verifyError'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('')
    const [result, setResult] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)

    const navigate = useNavigate()
    
    function handleForgetPassword(event: FormEvent<HTMLElement>, email: string)  {
      event.preventDefault()
      sendPasswordResetEmail(auth, email).then(() => {
        setSuccess(true)  
        setResult(`We sent a recovery email to ${email}`)
      }).catch((error) => {
        const message: string = error.code
        const errorMessage = verifyError(message);
        setResult(errorMessage)
      })
    }

  return (

      <div className={styles.body}>
          <div className={styles.header}>
            <img src="/src/assets/images/forgot.svg" alt="" />
            <h1 className={styles.titulo}>Forgot password?</h1>
            <p className={styles.subtitulo}>We can help you out!</p>
          </div>
            
                 <div className={styles.inputContainer}>
               <div>
                     <div className={styles.inputs}>
                         <img src="/src/assets/images/email.svg" id='img-mail' alt="" />
                         <input
                           placeholder='Email'
                           type="email"
                           name="email"
                           onChange={({target}) => setEmail(target.value)}
                           value={email}
                           className={styles.input}
                         />
                     </div>
                     {result && <span className={styles.spanResult}>{result}</span>}

               </div>
               {success && <p>Didn't receive the email? <br></br><button className={styles.resend} onSubmit={(e) => handleForgetPassword(e, email)}>Click here to resend it</button></p>}
                   <button onClick={(e) => handleForgetPassword(e, email)} className={styles.resetButton}>
                      Send email
                    </button>
              <button onClick={() => navigate('/')} className={styles.goBack}><img src='/src/assets/images/return.svg'></img> Go back to sign in</button>
               </div>

             <div className={styles.footer}>
                <img src="/src/assets/images/audio.svg" alt="" />
                <p>Audio</p>
             </div>
    </div>

  )
}

export default ForgotPassword

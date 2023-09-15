import { useNavigate} from 'react-router-dom'
import styles from './SignIn.module.css'
import {useContext } from 'react'
import Swal from 'sweetalert2';
import Loading from "../../components/Loading/Loading";
import { UserContext } from "../../contexts/UserContext";
import Form from '../../components/Form';

const SignUp = () => {
  const {loadingUser, 
    error,
    passwordError,
    emailError, setError, setEmail, setPassword } = useContext(UserContext)

  const navigate = useNavigate()

  const showErrorPopUp = () => {
    Swal.fire({
      title: 'Oops...',
      text: error
    }).then(() => {
      console.log();      
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleClick = () => {
    setError('')
    setEmail('')
    setPassword('')
    navigate('/sign-up')    
  }

  return (
    <>
    {loadingUser && <Loading signout={false}/>}
    {!emailError && !passwordError && error && showErrorPopUp()}
    <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.form}>

              <div className={styles.marca}>
                <div className={styles.logo}>
                  <img src="/src/assets/images/logo-audio.svg" alt="" />
                  <h1>Audio</h1>
                </div>
                <h2>It's modular and designed to last</h2>
              </div>

              <div className={styles.header}>
                <h1 className={styles.titulo}>Audio</h1>
                <p className={styles.subtitulo}>It's modular and designed to last</p>
              </div>
                
              <div>
                <Form type={'In'} />
                <p style={{paddingTop: '1.5rem'}}>Didn't have an account? <button className={styles.button} onClick={handleClick}>Sing Up here</button></p>
              </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default SignUp

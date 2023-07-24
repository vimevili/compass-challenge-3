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
    emailError } = useContext(UserContext)

  const navigate = useNavigate()
  
  return (
    <>
    {loadingUser && <Loading />}
    {!emailError && !passwordError && error && Swal.fire({
      title: 'Oops...',
      text: error
    })}
      <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.titulo}>Audio</h1>
            <p className={styles.subtitulo}>It's modular and designed to last</p>
          </div>
            
         <Form type={'In'}/>

          <div className={styles.signinContainer}>
              <p style={{paddingTop: '1.5rem'}}>Didn't have any account? <button onClick={() => navigate('/sign-up')} className={styles.singup}>Sing Up here</button></p>
          </div>
    </div>
    </>
  )
}

export default SignUp

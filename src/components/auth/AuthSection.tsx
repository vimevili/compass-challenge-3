import { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import './AuthSection.css'

const AuthSection = ({type}) => {
    
    const { signUp, signInWithGoogle, signInWithFacebook, logOut, user, setEmail, setPassword } =  useContext(UserContext);

  return (
    <>
        <h1 className='titulo'>Audio</h1>
        <p className='subtitulo'>It's modular and designed to last</p>

        <form>
        <div className='inputs'>

            <div className='flex'>
            <img src="public/images/icon-mail.svg" id='img-mail' alt="" />
            <input type="email" placeholder='Email' id='email' onChange={({target}) => setEmail(target.value)}/>
            </div>

            <div className='flex'>
            <img src="public/images/icon-lock.svg" id='img-lock' alt="" />
            <input type="password" placeholder='Password' id='password' onChange={({target}) => setPassword(target.value)}/>
            </div>

        {type === 'Up' && <>
        <button onClick={signUp}>Sign Up</button>
        <ul className='social-container'>
            <li><a onClick={signInWithFacebook}><img src="public/images/facebook.svg" alt="" /></a></li>
            <li><a onClick={signInWithGoogle}><img src="public/images/google.svg" className='google' alt="" /></a></li>
        </ul>
        </>

        }

        </div>
        {type === 'In' &&  <>
        <div className='signin-container'>
            <a href="" id='forgot'>Forgot Password</a>
            <button onClick={console.log('oi')}>Sign In</button>
            <p>Didn't have any account? <a href="" id='singin'>Sing Up here</a></p>
        </div>
        </>
        }
        </form>
    </>
  )
}

export default AuthSection

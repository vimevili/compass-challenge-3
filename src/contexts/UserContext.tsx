import { auth, googleProvider, facebookProvider } from '../services/firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyError from '../contexts/verifyError'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
//States e consts
  const [user, setUser] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingUser, setLoadingUser] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate();

//Filtered errors
  const passwordError = error && error.includes('password') ? error : '';
  const emailError = error && error.includes('email') ? error : '';

// User logged verification
  function isLogged(){
    const user = localStorage.getItem('userLogged')
    if(!user) return false
    return true
}

// SignIn functions
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setError('')
        setLoadingUser(true);
        setTimeout(() => {
          localStorage.setItem('userLogged', userCredential.accessToken)
          setLoadingUser(false);
          navigate('/home');
        }, 1500);
      })
      .catch((error) => {
        const errorMessage = verifyError(error.code);
        setError(errorMessage)
      });
  };

  function validateEmail(email) {
    setEmail(email)
    if ((/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email))) {
      setError('')
    } else {
      setError('An email must have this format: test@test.com')
    }
  }

  function validatePassword(password) {
    setPassword(password)
    if (password.length >= 6) {
      setError('')
    }
  }
  
// SignUp functions 
  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setUser(userCredential.user)
      setError('')
      setLoadingUser(true)

      setTimeout(() => {
        localStorage.setItem('userLogged', user.accessToken)
        setLoadingUser(false);
        navigate('/home');
      }, 1500);
    })
    .catch((error) => {
      const errorMessage = verifyError(error.code);
      setError(errorMessage)
    });
  };

// SignOut functions
  const logOut = () => {
    signOut(auth).then(() => {
      setUser(null)
      setError('')
      setLoadingUser(true)
      // Timeout for loading component
      setTimeout(() => {
        localStorage.removeItem('userLogged')
        setLoadingUser(false);
        navigate('/');
      }, 1500);
    }).catch((error) => {
      const errorMessage = verifyError(error.code);
      setError(errorMessage)
    });
  }

// Google authentication
  function signInWithGoogle(e){
    e.preventDefault();
    signInWithPopup(auth, googleProvider).then((userCredential)=>{
      setUser(userCredential.user)
      setError('')
      setLoadingUser(true);

      setTimeout(() => {
        localStorage.setItem('userLogged', userCredential.accessToken)
        setLoadingUser(false);
        navigate('/home');
      }, 1500);
    }).catch((error)=> {
      const errorMessage = verifyError(error.code);
      setError(errorMessage)
    })
  }
// Facebook authentication 
  const signInWithFacebook=(e)=>{
    e.preventDefault()
    signInWithPopup(auth, facebookProvider).then((result)=>{
      setUser(result.user);
      setError('')
      setLoadingUser(true)

      setTimeout(() => {
        localStorage.setItem('userLogged', user.accessToken)
        setLoadingUser(false);
        navigate('/home');
      }, 1500);
    }).catch((error)=>{
      const errorMessage = verifyError(error.code);
        setError(errorMessage)
    })
  }

  return (
    <UserContext.Provider
      value={{
        email,
        password,
        loadingUser,
        signIn,
        signUp,
        logOut,
        signInWithGoogle, 
        signInWithFacebook,
        validateEmail,
        validatePassword,
        error,
        passwordError,
        emailError, 
        isLogged    
      }}>
      {children}
    </UserContext.Provider>
  );
}

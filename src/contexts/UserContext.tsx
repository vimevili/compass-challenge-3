import { auth, googleProvider, facebookProvider } from '../services/firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import { useState, FormEvent, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyError from '../contexts/verifyError'

interface UserContextData {
  email: string;
  password: string;
  loadingUser: boolean;
  signIn: (e: FormEvent<HTMLFormElement>) => void;
  signUp: (e: FormEvent<HTMLFormElement>) => void;
  logOut: () => void;
  signInWithGoogle: (e: FormEvent<HTMLFormElement>) => void;
  signInWithFacebook: (e: FormEvent<HTMLFormElement>) => void;
  validateEmail: (email: string) => void;
  validatePassword: (password: string) => void;
  error: string;
  passwordError: string;
  emailError: string; 
  isLogged: () => boolean;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC = ({ children }) => {

//States e consts
  const [user, setUser] = useState<object>()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loadingUser, setLoadingUser] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate();

//Filtered errors
  const passwordError: string = error && error.includes('password') ? error : '';
  const emailError: string = error && error.includes('email') ? error : '';

// User logged verification
  function isLogged(){
    const user = localStorage.getItem('userLogged')
    if(!user) return false
    return true
}

// SignIn functions
  const signIn = (e: FormEvent<HTMLFormElement>) => {
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

  function validateEmail(email: string) {
    setEmail(email)
    if ((/^[a-z0-9._]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email))) {
      setError('')
    } else {
      setError('An email must have this format: test@test.com')
    }
  }

  function validatePassword(password: string) {
    setPassword(password)
    if (password.length >= 6) {
      setError('')
    }
  }
  
// SignUp functions 
  const signUp = (e: FormEvent<HTMLFormElement>) => {
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
  function signInWithGoogle(e: FormEvent<HTMLFormElement>){
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
  const signInWithFacebook=(e: FormEvent<HTMLFormElement>)=>{
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

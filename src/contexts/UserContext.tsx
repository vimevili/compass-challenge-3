import { auth, googleProvider, facebookProvider } from '../services/firebase';
import { User, signInWithPopup, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';
import {ReactNode, FormEvent, useState, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import verifyError from '../contexts/verifyError'

interface UserContextData {
  user: User | undefined,
  email: string;
  password: string;
  loadingUser: boolean;
  signIn: (e: FormEvent<HTMLButtonElement>) => void;
  signUp: (e: FormEvent<HTMLButtonElement>) => void;
  logOut: () => void;
  signInWithGoogle: (e: FormEvent<HTMLButtonElement>) => void;
  signInWithFacebook: (e: FormEvent<HTMLButtonElement>) => void;
  validateEmail: (email: string) => void;
  validatePassword: (password: string) => void;
  error: string;
  passwordError: string;
  emailError: string; 
  isLogged: () => boolean;
}

export const UserContext = createContext<UserContextData>({} as UserContextData);
type Props = {children: ReactNode }
export const UserProvider: React.FC<Props> = ({ children }) => {

//States e consts
  const [user, setUser] = useState<User>()
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
  const signIn = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(({user}) => {
        const userData: User = user
        setUser(userData)
        setError('')
        setLoadingUser(true);
        setTimeout(() => {
        const id: string = user && user.email!
          localStorage.setItem('userLogged', id)
          setLoadingUser(false);
          navigate('/home');
        }, 1500);
      })
      .catch(({code}) => {
        const message: string = code
        const errorMessage = verifyError(message);
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
  const signUp = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(({user}) => {
      setUser(user)
      setError('')
      setLoadingUser(true)

      setTimeout(() => {
        localStorage.setItem('userLogged', user.email!)
        setLoadingUser(false);
        navigate('/home');
      }, 1500);
    })
    .catch(({code}) => {
      const message: string = code
      const errorMessage = verifyError(message);
      setError(errorMessage)
    });
  };

// SignOut functions
  const logOut = () => {
    signOut(auth).then(() => {
      setUser(undefined)
      setError('')
      setLoadingUser(true)
      // Timeout for loading component
      setTimeout(() => {
        localStorage.removeItem('userLogged')
        setLoadingUser(false);
        navigate('/');
      }, 1500);
    }).catch(({code}) => {
      const message: string = code
        const errorMessage = verifyError(message);
        setError(errorMessage)
    });
  }

// Google authentication
  function signInWithGoogle(e: FormEvent<HTMLButtonElement>){
    e.preventDefault();
    signInWithPopup(auth, googleProvider).then(({user})=>{
      setUser(user)
      setError('')
      setLoadingUser(true);

      setTimeout(() => {
        localStorage.setItem('userLogged', user.email!)
        setLoadingUser(false);
        navigate('/home');
      }, 1500);
    }).catch(({code})=> {
      const message: string = code
      const errorMessage = verifyError(message);
      setError(errorMessage)
    })
  }
// Facebook authentication 
  const signInWithFacebook=(e: FormEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    signInWithPopup(auth, facebookProvider).then(({user})=>{
      setUser(user);
      setError('')
      setLoadingUser(true)

      setTimeout(() => {
        localStorage.setItem('userLogged', user.email!)
        setLoadingUser(false);
        navigate('/home');
      }, 1500);
    }).catch(({code})=>{
      const message: string = code
      const errorMessage = verifyError(message);
      setError(errorMessage)
    })
  }

  return (
    <UserContext.Provider
      value={{
        user,
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

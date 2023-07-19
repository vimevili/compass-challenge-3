import { auth, googleProvider } from '../services/firebase';
import { signInWithPopup  } from 'firebase/auth';
import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle   } from "react-firebase-hooks/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('')

  useEffect(()=>{
    setEmailValue(localStorage.getItem('email'))
}, [])
  // Google authentication
  function SignInWithGoogle(){
        signInWithPopup(auth, googleProvider).then((data)=>{
          setEmailValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        }).catch((err)=> console.log(err))
    }

  return (
    <UserContext.Provider
      value={{
        SignInWithGoogle,      
      }}>
      {children}
    </UserContext.Provider>
  );
}

import { auth, googleProvider, facebookProvider } from '../config/firebase';
import {  getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import { useState, useEffect, createContext } from 'react';
import Loading from '../components/pages/Loading/Loading';
import { Link, Navigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();

  
  // Google authentication

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      const storageToken = sessionStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setCurrentUser(storageUser);
      }
    };
    loadStorageData();
  });

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setCurrentUser(user);
        sessionStorage.setItem("@AuthFirebase:token", token);
        sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function signOut() {
    sessionStorage.clear();
    setCurrentUser(null);
    return <Navigate to="/home" />;
  }

  // const signInWithGoogle = () => {
    //   signInWithPopup(auth, googleProvider)
    //     .then((result) => {
  //       setUser(result.user);
  //       console.log(result.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  // Default authentication
  // const [
  //   createUserWithEmailAndPassword,
  //   user,
  //   loading,
  //   error,
  // ] = useCreateUserWithEmailAndPassword(auth);

  // const signUp = (email, password) => {
  //     createUserWithEmailAndPassword(auth, email, password)
  //     .then((result) => {
  //       setCurrentUser(result.user);
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //     });
  //     if(loading) <Loading />
  //     if(error) <p>{error.message}</p>
  //     if(user) <p>{user.user.email}</p>
  // };

  // const [
  //   signInWithEmailAndPassword,
  //   user,
  //   loading,
  //   error,
  // ] = useSignInWithEmailAndPassword(auth);

  // const signIn = (email, password) => {
  //   signInWithEmailAndPassword(email, password).then((result) => console.log(result)).catch((err) => {
  //     console.log(err);
  // });
  // if(loading) <Loading />
  // if(error) <p>{error.message}</p>
  // if(user) <p>{user.user.email}</p>
  // }
  // // Facebook authentication
  // const signInWithFacebook = () => {
  //   signInWithPopup(auth, facebookProvider)
  //     .then((result) => {
  //       setCurrentUser(result.user);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     setCurrentUser(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <UserContext.Provider
      value={{
        signed: !!currentUser,
        currentUser,        
        signInGoogle,
        signOut,
        setPassword, 
        setEmail
      }}>
      {children}
    </UserContext.Provider>
  );
};

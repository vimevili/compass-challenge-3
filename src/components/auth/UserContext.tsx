import { auth, googleProvider, facebookProvider } from '../../config/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState, createContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Default authentication
  const signUp = (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
          setUser(result.user);
      })
      .catch((err) => {
          console.log(err);
      });
  };
  // Google authentication
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Facebook authentication
  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        signUp,
        signInWithGoogle,
        signInWithFacebook,
        logOut,
        user, 
        setPassword, 
        setEmail
      }}>
      {children}
    </UserContext.Provider>
  );
};

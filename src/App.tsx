import './App.css'
import { UserProvider } from './contexts/UserContext'
import { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignUp from './components/pages/Sign/SignUp'
import SignIn from './components/pages/Sign/SignIn'
import UserLogged from './components/pages/UserLogged';
import { CartProvider } from './contexts/CartContext';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)
  const isLogged = () => {
    if(user) localStorage.setItem('userLogged', user.accessToken)
  }
  isLogged();

  return (
    <>
    <UserProvider>
      <CartProvider>
        <AnimatePresence mode='wait'
        initial={false}
        custom={{ action: navigate }}>
          <motion.div >
              <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<SignIn setUser={setUser}/>} />
                  <Route path="/sign-up" element={<SignUp setUser={setUser}/>} />
              </Routes>
              {user && <UserLogged user={user}/>}
          </motion.div>
        </AnimatePresence>
      </CartProvider>
    </UserProvider>
    </>
  )
}

export default App

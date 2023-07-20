import './App.css'
import { UserProvider } from './contexts/UserContext'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignUp from './components/pages/Sign/SignUp'
import SignIn from './components/pages/Sign/SignIn'
import { CartProvider } from './contexts/CartContext';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'
import UserLogged from './components/pages/UserLogged';

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
    <UserProvider>
      <CartProvider>
        <AnimatePresence mode='wait'
        initial={false}
        custom={{ action: navigate }}>
          <motion.div >
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
            <UserLogged />
          </motion.div>
        </AnimatePresence>
      </CartProvider>
    </UserProvider>
    </>
  )
}

export default App

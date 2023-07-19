import './App.css'
import { UserProvider } from './contexts/UserContext'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignUp from './components/pages/Sign/SignUp'
import SignIn from './components/pages/Sign/SignIn'
import Home from './components/pages/Home/Home'
import SearchPage from './components/pages/Search/SearchPage'
import Explore from './components/pages/Explore/Explore'
import Overview from './components/pages/Product/Overview'
import Specification from './components/pages/Product/Specification'
import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart'
import { CartProvider } from './contexts/CartContext';
import { AnimatePresence } from 'framer-motion';
import {motion} from 'framer-motion'

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
                <Route path="/home" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/products" element={<Explore />} />
                <Route path="/products/:id/overview" element={<Overview />} />
                <Route path="/products/:id/features" element={<Specification />} />
              </Routes>
          </motion.div>
        </AnimatePresence>
      </CartProvider>
    </UserProvider>
    </>
  )
}

export default App

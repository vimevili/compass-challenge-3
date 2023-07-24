import './App.css'
import { UserProvider } from './contexts/UserContext'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import SearchPage from './pages/Search/SearchPage'
import Explore from './pages/Explore/Explore'
import Overview from './pages/Product/Overview'
import Specification from './pages/Product/Specification'
import ShoppingCart from './pages/ShoppingCart/ShoppingCart'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import PrivateRoute from './services/PrivateRoute';
import { CartProvider } from './contexts/CartContext';
import { AnimatePresence } from 'framer-motion';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

function App() {

  return (
    <>
    <UserProvider>
      <CartProvider>
        <AnimatePresence mode='wait'
        initial={false}>
              <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/forgot" element={<ForgotPassword />} />
                  <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                  <Route path="/products" element={<PrivateRoute><Explore /></PrivateRoute>} />
                  <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
                  <Route path="/products/:id/overview" element={<PrivateRoute><Overview /></PrivateRoute>} />
                  <Route path="/products/:id/features" element={<PrivateRoute><Specification /></PrivateRoute>} />
                  <Route path="/cart" element={<PrivateRoute><ShoppingCart /></PrivateRoute>} />
              </Routes>
        </AnimatePresence>
      </CartProvider>
    </UserProvider>
    </>
  )
}

export default App

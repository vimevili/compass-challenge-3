import './App.css'
import { useState } from 'react';
import { UserProvider } from './components/auth/UserContext'
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/pages/Sign/SignUp'
import SignIn from './components/pages/Sign/SignIn'
import Home from './components/pages/Home/Home'
import SearchPage from './components/pages/Search/SearchPage'
import Explore from './components/pages/Explore/Explore'
import Overview from './components/pages/Product/Overview'
import Specification from './components/pages/Product/Specification'
import ShoppingCart from './components/pages/ShoppingCart/ShoppingCart'
import { CartProvider } from './contexts/CartContext';
function App() {

  return (
    <>
    <UserProvider>
      <CartProvider>
      <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/products" element={<Explore />} />
          <Route path="/products/:id/overview" element={<Overview />} />
          <Route path="/products/:id/features" element={<Specification />} />
        </Routes>
      </CartProvider>
    </UserProvider>
    </>
  )
}

export default App

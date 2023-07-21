import { Navigate } from "react-router-dom";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import SearchPage from '../pages/Search/SearchPage'
import Explore from '../pages/Explore/Explore'
import Overview from '../pages/Product/Overview'
import Specification from '../pages/Product/Specification'
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart'

const UserLogged = ({user}) => {
    const isLogged = localStorage.getItem('userLogged')
    
    return (
        isLogged ? 
            <Routes>
                <Route path="/home" element={<Home user={user}/>} />
                <Route path="/products" element={<Explore/>} />
                <Route path="/searc" element={<SearchPage/>} />
                <Route path="/products/:id/overview" element={<Overview/>} />
                <Route path="/products/:id/features" element={<Specification/>} />
                <Route path="/cart" element={<ShoppingCart/>} />
            </Routes> 
        : <Navigate to="/" />
    )
}

export default UserLogged;

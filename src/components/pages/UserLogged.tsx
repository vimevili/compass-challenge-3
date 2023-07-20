import { Routes, Navigate  } from 'react-router-dom'
import { Route} from 'react-router-dom';
import Home from '../pages/Home/Home'
import SearchPage from '../pages/Search/SearchPage'
import Explore from '../pages/Explore/Explore'
import Overview from '../pages/Product/Overview'
import Specification from '../pages/Product/Specification'
import ShoppingCart from '../pages/ShoppingCart/ShoppingCart'


const UserLogged = () => {
    const isLogged = localStorage.getItem('userEmail')

    return isLogged ? <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/products" element={<Explore />} />
            <Route path="/products/:id/overview" element={<Overview />} />
            <Route path="/products/:id/features" element={<Specification />} />
    </Routes>
         : <Navigate to="/" />;

}

export default UserLogged

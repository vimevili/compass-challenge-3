import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const PrivateRoute =  ({ children }: { children: JSX.Element }) => {

    const {isLogged} = useContext(UserContext)
    const authenticated = isLogged()
    
    return authenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

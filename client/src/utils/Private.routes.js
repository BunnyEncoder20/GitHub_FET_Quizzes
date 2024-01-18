import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoutes = () => {

    const { user } = useContext(UserContext);

    return (
        user.token ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoutes
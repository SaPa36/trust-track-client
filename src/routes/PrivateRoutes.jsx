
import { use } from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if(loading){
        return <div className='flex items-center justify-center h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-trust-lime"></div>
        </div>
    }

    if(!user){
      return <Navigate to="/login" state={{ from: location }}></Navigate>
    }

    return children;
};

export default PrivateRoutes;
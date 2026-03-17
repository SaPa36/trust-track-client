import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = () => {
    const {user, loading} = useAuth();
    
    if(loading){
        return <div className='flex items-center justify-center h-screen'>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-trust-lime"></div>
        </div>
    }

    if(!user){
       <Navigate to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoutes;
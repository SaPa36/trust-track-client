import React from 'react';

import authImg from '../assets/authImage.png'
import { Outlet } from 'react-router';
import ProFastLogo from '../pages/shared/ProFastLogo';


const AuthLayout = () => {
  

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 font-urbanist">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Left Side: Form */}
        <div className="flex-1 p-2 ">
          <ProFastLogo />
          
          <div className='pl-4 md:pl-10'>
            <Outlet></Outlet>
          </div>
        </div>

        {/* Right Side: Illustration */}
        <div className="flex-1  hidden md:flex items-center justify-center p-10">
           <img 
             src={authImg}
             alt="Delivery Illustration" 
             className="max-w-full h-auto rounded-3xl"
           />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
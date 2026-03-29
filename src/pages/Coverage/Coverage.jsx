import React from 'react';
import BangladeshMap from './BangladeshMap';

const Coverage = () => {
    return (
         <div className="max-w-4xl mx-auto px-4 ">
            <h1 className="text-3xl font-bold text-center mb-3">We are available in 64 districts</h1>
            <BangladeshMap />
        </div>
    );
};

export default Coverage;
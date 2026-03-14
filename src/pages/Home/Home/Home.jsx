import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';



const Home = () => {
    return (
        <div className='space-y-10'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;
import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import LogoMarquee from '../LogoMarquee/LogoMarquee';
import FeaturesSection from '../FeatureSection/FeatureSection';



const Home = () => {
    return (
        <div className='space-y-10'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogoMarquee></LogoMarquee>
            <FeaturesSection></FeaturesSection>
        </div>
    );
};

export default Home;
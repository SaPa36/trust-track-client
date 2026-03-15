import React from 'react';
import Banner from '../Banner/Banner';
import HowItWorks from '../HowItWorks/HowItWorks';
import OurServices from '../OurServices/OurServices';
import LogoMarquee from '../LogoMarquee/LogoMarquee';
import FeaturesSection from '../FeatureSection/FeatureSection';
import MerchantCTA from '../MerchantCTA/MerchantCTA';
import Testimonials from '../Testimonials/Testimonials';
import FAQSection from '../FAQSection/FAQSection';



const Home = () => {
    return (
        <div className='space-y-10'>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <LogoMarquee></LogoMarquee>
            <FeaturesSection></FeaturesSection>
            <MerchantCTA></MerchantCTA>
            <Testimonials></Testimonials>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;
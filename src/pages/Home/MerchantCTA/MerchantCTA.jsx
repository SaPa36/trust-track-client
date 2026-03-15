import React from 'react';
import ctaIllustration from '../../../assets/location-merchant.png';
import merchantBg from '../../../assets/be-a-merchant-bg.png'; // 1. Import your background

const MerchantCTA = () => {
  return (
    <section className="py-10 md:px-12 bg-slate-100">
      <div 
        className="hero min-h-[400px] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl 
        bg-[url('assets/be-a-merchant-bg.png'),_radial-gradient(circle_at_50%_-20%,_#004D4D_0%,_#002B2B_100%)] 
        bg-no-repeat bg-right-bottom bg-cover"
      >
        <div className="hero-content flex-col lg:flex-row-reverse p-8 md:p-16 gap-10">
          
          <img
            src={ctaIllustration}
            className="max-w-xs md:max-w-md lg:max-w-md object-contain"
            alt="Merchant Location Illustration"
          />

          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="py-6 text-slate-200 text-sm md:text-base max-w-xl">
              We offer the lowest delivery charge with the highest value along with 100% safety of your product. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn border-none bg-trust-lime text-trust-dark hover:bg-white rounded-full px-8">
                Become a Merchant
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MerchantCTA;
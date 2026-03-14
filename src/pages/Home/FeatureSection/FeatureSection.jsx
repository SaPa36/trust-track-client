import React from 'react';
// Import your line-art illustrations from your assets
import trackingImg from '../../../assets/Illustration.png';
import safeDeliveryImg from '../../../assets/Vector.png';
import supportImg from '../../../assets/Vector.png';

const features = [
  {
    title: "Live Parcel Tracking",
    description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: trackingImg
  },
  {
    title: "100% Safe Delivery",
    description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: safeDeliveryImg
  },
  {
    title: "24/7 Call Center Support",
    description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: supportImg
  }
];

const FeaturesSection = () => {
  return (
    <section className="bg-slate-100 py-5 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-[32px] p-8  flex flex-col md:flex-row items-center gap-8  shadow-sm"
          >
            {/* Left Side: Illustration */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="max-h-[150px] object-contain"
              />
            </div>

            {/* Vertical Dashed Divider (Hidden on Mobile) */}
            <div className="hidden md:block h-32 border-l-2 border-dashed border-slate-300"></div>

            {/* Right Side: Content */}
            <div className="w-full md:w-2/3 text-left">
              <h3 className="text-2xl font-bold text-[#002B2B] mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
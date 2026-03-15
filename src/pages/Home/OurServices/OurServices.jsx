import React, { useState } from 'react'; // [1] Import useState
import { Truck, Globe, Box, Wallet, Building, RotateCcw } from 'lucide-react';

const services = [
  {
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: <Box className="w-6 h-6" />,
  },
  {
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: <Wallet className="w-6 h-6" />,
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support.",
    icon: <Building className="w-6 h-6" />,
  },
  {
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: <RotateCcw className="w-6 h-6" />,
  }
];

const OurServices = () => {
  // [2] Create state to track which card is hovered
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="bg-[#002B2B] py-20 px-3 md:px-6 rounded-[40px] md:m-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-16 text-sm leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
        </p>

        <div data-aos="fade-up"  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            // [3] Check if this specific card is the one being hovered
            const isHovered = hoveredIndex === index;

            return (
              <div 
                key={index}
                
                onMouseEnter={() => setHoveredIndex(index)} // [4] Set index on hover
                onMouseLeave={() => setHoveredIndex(null)}  // [5] Reset on leave
                className={`p-10 rounded-[32px] flex flex-col items-center text-center transition-all duration-300 transform ${
                  isHovered 
                  ? "bg-[#B4D330] text-[#002B2B] -translate-y-2" 
                  : "bg-white text-[#002B2B]"
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors ${
                  isHovered ? "bg-white/50" : "bg-blue-50"
                }`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-4 px-4">{service.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors ${
                  isHovered ? "text-[#002B2B]/80" : "text-gray-600"
                }`}>
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
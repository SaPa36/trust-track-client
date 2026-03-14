import React from 'react';
// [1] Import your local images
import casioLogo from '../../../assets/brands/casio.png';
import amazonLogo from '../../../assets/brands/amazon.png';
import moonstarLogo from '../../../assets/brands/moonstar.png';
import starplusLogo from '../../../assets/brands/start.png';
import startpeopleLogo from '../../../assets/brands/start-people 1.png';
import randstadLogo from '../../../assets/brands/randstad.png';

const logos = [
    { name: "Casio", src: casioLogo },
    { name: "Amazon", src: amazonLogo },
    { name: "Moonstar", src: moonstarLogo },
    { name: "Star+", src: starplusLogo },
    { name: "Start People", src: startpeopleLogo },
    { name: "Randstad", src: randstadLogo },
  ];
  
  const LogoMarquee = () => {
    return (
      <div className="bg-[#f0f4f4] py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-center text-2xl font-bold text-[#002B2B]">
            We've helped thousands of sales teams
          </h2>
        </div>
  
        <div className="relative flex overflow-x-hidden">
          {/* The container for the moving logos */}
          <div className="animate-marquee flex whitespace-nowrap items-center gap-[100px]">
            {/* We repeat the array once for the infinite loop effect */}
            {[...logos, ...logos].map((logo, index) => (
              <img 
                key={index} 
                src={logo.src} 
                alt={logo.name} 
                className="h-[26px] w-auto object-contain flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default LogoMarquee;
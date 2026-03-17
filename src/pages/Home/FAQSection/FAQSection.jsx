import React, { useState } from 'react';

const faqs = [
  { q: "How does this posture corrector work?", a: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day." },
  { q: "Is it suitable for all ages and body types?", a: "Yes, our posture corrector is designed to be adjustable for various body types and age groups." },
  { q: "Does it really help with back pain and posture improvement?", a: "It provides alignment support which reduces strain and helps train your muscles." },
  { q: "Does it have smart features like vibration alerts?", a: "Our model focuses on ergonomic support, check the product details for specific tech features." },
  { q: "How will I be notified when the product is back in stock?", a: "You can sign up for our email alerts on the product page." }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // Initially open the first one

  return (
    <section className="py-5 px-6 bg-slate-50">
      <div className="max-w-3xl mx-auto text-center mb-6">
        <h2 className="text-4xl font-bold text-[#002B2B] mb-4">Frequently Asked Question (FAQ)</h2>
        <p className="text-slate-500">Enhance posture, mobility, and well-being effortlessly with Posture Pro.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`border rounded-2xl p-3 transition-all duration-300 ${openIndex === index ? 'bg-[#EAF1F1] border-[#B2C8C8]' : 'bg-white border-slate-200'}`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="flex justify-between w-full items-center font-bold text-[#002B2B]"
            >
              {faq.q}
              <span className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
            </button>
            
            {openIndex === index && (
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-4">
        <button className="bg-trust-lime text-black font-bold px-8 py-4 rounded-full flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
          See More FAQ's <span className="bg-black text-white p-1 rounded-full text-xs">↗</span>
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
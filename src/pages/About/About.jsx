import React, { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('Story');

  // Content for each tab
  const content = {
    Story: "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.",
    Mission: "Our mission is to bridge the gap between businesses and customers through innovative delivery solutions and unparalleled logistics technology.",
    Success: "With 10+ years in the industry, we have successfully delivered over 5 million parcels across every district in Bangladesh.",
    "Team & Others": "Our team consists of 500+ dedicated professionals working around the clock to ensure your business grows without boundaries."
  };

  const tabs = ['Story', 'Mission', 'Success', 'Team & Others'];

  return (
    <section className=" px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h2 className="text-5xl font-bold text-[#002B2B] mb-4">About Us</h2>
        <p className="text-slate-500 mb-10 max-w-xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>

        {/* Tab Buttons */}
        <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-lg font-medium transition-colors duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#002B2B] border-b-2 border-[#002B2B]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="bg-slate-50 p-8 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-600 leading-relaxed text-lg">
            {content[activeTab]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
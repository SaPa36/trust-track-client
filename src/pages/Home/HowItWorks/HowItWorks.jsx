import { MapPin, Wallet, Landmark, Building2 } from 'lucide-react';

const steps = [
  {
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <MapPin className="w-8 h-8 text-teal-800" />,
  },
  {
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <Wallet className="w-8 h-8 text-teal-800" />,
  },
  {
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <Landmark className="w-8 h-8 text-teal-800" />,
  },
  {
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time.",
    icon: <Building2 className="w-8 h-8 text-teal-800" />,
  }
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-5 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-900 mb-12 ml-4">How it Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
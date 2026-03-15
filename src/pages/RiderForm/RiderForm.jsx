import React from 'react';
import { useForm } from 'react-hook-form';
import rider from '../../assets/agent-pending.png';

const RiderForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Application Submitted!");
  };

  return (
    <section className=" px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#002B2B] mb-2">Be a Rider</h2>
        <p className="text-slate-500 ">Enjoy fast, reliable parcel delivery with real-time tracking...</p>

        <div className="bg-white p-8  rounded-3xl shadow-xl flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Form Side */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 w-full ">
            <h3 className="text-2xl font-bold text-[#002B2B]">Tell us about yourself</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[ { label: "Your Name", id: "name" }, { label: "Your Age", id: "age" }, 
                 { label: "Your Email", id: "email" }, { label: "NID No", id: "nid" }, 
                 { label: "Contact", id: "contact" } ].map((field) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-[#002B2B]">{field.label}</label>
                  <input {...register(field.id, { required: true })} className="p-3 border rounded-lg focus:ring-2 focus:ring-[#D8EF6A] outline-none" placeholder={field.label} />
                </div>
              ))}

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">Your Region</label>
                <select {...register("region")} className="p-3 border rounded-lg outline-none">
                  <option>Select your region</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 mb-4">
              <label className="text-sm  font-semibold text-[#002B2B]">Which wire-house you want to work?</label>
              <select {...register("warehouse")} className="p-3 border rounded-lg outline-none">
                <option>Select wire-house</option>
                <option>Warehouse A</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-trust-lime py-4 rounded-xl font-bold hover:bg-[#cde360] transition-colors">
              Submit
            </button>
          </form>

          {/* Image Side */}
          <div className="hidden lg:block flex-1">
            <img src={rider} alt="Delivery Rider" className="w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiderForm;
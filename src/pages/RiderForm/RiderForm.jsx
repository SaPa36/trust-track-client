import React from 'react';
import { useForm } from 'react-hook-form';
import rider from '../../assets/agent-pending.png';

const RiderForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    
  };

  return (
    <section className=" px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#002B2B] mb-2">Be a Rider</h2>
        <p className="text-slate-500 ">Enjoy fast, reliable parcel delivery with real-time tracking...</p>

        <div className="bg-white mt-4 md:mt-0 md:pl-6  rounded-3xl shadow-xl flex flex-col lg:flex-row gap-20 items-center">

          {/* Form Side */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 w-full ">
            <h3 className="text-2xl font-bold text-[#002B2B]">Tell us about yourself</h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">Your Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className={`p-2 border rounded-lg outline-none ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
              </div>

              {/* Age */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">Your Age</label>
                <input
                  {...register("age", { required: "Age is required" })}
                  className={`p-2 border rounded-lg outline-none ${errors.age ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Your age"
                />
                {errors.age && <span className="text-red-500 text-xs">{errors.age.message}</span>}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">Your Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className={`p-2 border rounded-lg outline-none ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Your Email"
                />
                {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
              </div>

              {/* NID */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">NID No</label>
                <input
                  {...register("nid", { required: "NID is required" })}
                  className={`p-2 border rounded-lg outline-none ${errors.nid ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="NID"
                />
                {errors.nid && <span className="text-red-500 text-xs">{errors.nid.message}</span>}
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">Contact</label>
                <input
                  {...register("contact", { required: "Contact number is required" })}
                  className={`p-2 border rounded-lg outline-none ${errors.contact ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Contact"
                />
                {errors.contact && <span className="text-red-500 text-xs">{errors.contact.message}</span>}
              </div>

              {/* Region Select */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-[#002B2B]">Your Region</label>
                <select
                  {...register("region", { required: "Please select a region" })}
                  className={`p-2 border rounded-lg outline-none w-full bg-white ${errors.region ? 'border-red-500' : 'border-slate-300'}`}
                >
                  <option value="">Select your region</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="chittagong">Chittagong</option>
                </select>
                {errors.region && <span className="text-red-500 text-xs">{errors.region.message}</span>}
              </div>
            </div>

            {/* Warehouse Select */}
            <div className="flex mt-4 mb-4 flex-col gap-2">
              <label className="text-sm font-semibold text-[#002B2B]">Which wire-house you want to work?</label>
              <select
                {...register("warehouse", { required: "Please select a warehouse" })}
                className={`p-2 border rounded-lg outline-none w-full bg-white ${errors.warehouse ? 'border-red-500' : 'border-slate-300'}`}
              >
                <option value="">Select wire-house</option>
                <option value="warehouse-a">Warehouse A</option>
              </select>
              {errors.warehouse && <span className="text-red-500 text-xs">{errors.warehouse.message}</span>}
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
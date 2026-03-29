import React from 'react';
import { useForm } from 'react-hook-form';

const SendParcel = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parcelType: 'Document', // Default radio selection
        }
    });

    const onSubmit = (data) => {
        console.log("Parcel Data:", data);
        // You can send this to your backend/Firebase here
    };

    return (
        <div className="max-w-5xl mx-auto  bg-white shadow-sm rounded-lg border border-slate-100 ">
            <h1 className="text-3xl font-bold text-[#002B2B] mb-6">Add Parcel</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Section: Parcel Details */}
                <section className="p-6 border border-dashed border-blue-400 rounded-lg relative">
                    <h2 className="text-xl font-bold text-[#002B2B] mb-4">Enter your parcel details</h2>

                    {/* Radio Buttons */}
                    <div className="flex gap-10 mb-6">
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                            <input type="radio" value="Document" {...register("parcelType")} className="accent-[#9ACD32] w-4 h-4" />
                            Document
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                            <input type="radio" value="Not-Document" {...register("parcelType")} className="accent-[#9ACD32] w-4 h-4" />
                            Not-Document
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Parcel Name</label>
                            <input
                                {...register("parcelName", { required: "Parcel name is required" })}
                                placeholder="Parcel Name"
                                className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]"
                            />
                            {errors.parcelName && <p className="text-red-500 text-xs mt-1">{errors.parcelName.message}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Parcel Weight (KG)</label>
                            <input
                                type="number"
                                {...register("weight", { required: "Weight is required" })}
                                placeholder="Parcel Weight (KG)"
                                className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]"
                            />
                        </div>
                    </div>

                    {/* Sender & Receiver Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-5">

                        {/* Sender Details */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-[#002B2B] border-b pb-2">Sender Details</h3>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> {/* Parent container for the row */}

                                {/* Sender Name Group */}
                                <div className="flex flex-col">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Name</label>
                                    <input
                                        {...register("senderName")}
                                        placeholder="Sender Name"
                                        className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]"
                                    />
                                </div>

                                {/* Sender Warehouse Group */}
                                <div className="flex flex-col">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Warehouse</label>
                                    <select
                                        {...register("senderWarehouse")}
                                        className="w-full p-2 border border-slate-300 rounded text-slate-400 focus:outline-[#9ACD32]"
                                    >
                                        <option value="">Select Wire house</option>
                                        <option value="dhaka_main">Dhaka Main</option>
                                    </select>
                                </div>

                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Warehouse</label>
                                    <input {...register("senderAddress")} placeholder="Address" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />

                                </div>

                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Contact No</label>
                                    <input {...register("senderContact")} placeholder="Sender Contact No" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                                </div>

                            </div>
                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Sender Region</label>
                                <select {...register("senderRegion")} className="w-full p-2 border border-slate-300 rounded text-slate-400">
                                    <option value="">Select your region</option>
                                    <option value="dhaka">Dhaka</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Pickup Instruction</label>
                                <textarea {...register("pickupInstruction")} placeholder="Pickup Instruction" className="w-full p-2 border border-slate-300 rounded h-24 focus:outline-[#9ACD32]" />
                            </div>
                        </div>

                        {/* Receiver Details */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-[#002B2B] border-b pb-2">Receiver Details</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Name</label>
                                    <input {...register("receiverName")} placeholder="Receiver Name" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                                </div>
                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Warehouse</label>
                                    <select {...register("receiverWarehouse")} className="w-full p-2 border border-slate-300 rounded text-slate-400">
                                        <option value="">Select Warehouse</option>
                                        <option value="chattogram_main">Chattogram Main</option>
                                    </select>
                                </div>
                            </div>


                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Address</label>
                                    <input {...register("receiverAddress")} placeholder="Address" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                                </div>
                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Contact No</label>
                                    <input {...register("receiverContact")} placeholder="Receiver Contact No" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Region</label>
                                <select {...register("receiverRegion")} className="w-full p-2 border border-slate-300 rounded text-slate-400">
                                    <option value="">Select your region</option>
                                    <option value="chattogram">Chattogram</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Delivery Instruction</label>
                                <textarea {...register("deliveryInstruction")} placeholder="Delivery Instruction" className="w-full p-2 border border-slate-300 rounded h-24 focus:outline-[#9ACD32]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom Info & Submit */}
                <div className="flex flex-col gap-4">
                    <p className="text-sm font-semibold text-[#002B2B]">
                        ➤ PickUp Time 4pm-7pm Approx.
                    </p>
                    <button
                        type="submit"
                        className="w-fit px-8 py-3 bg-[#D4F06D] text-[#002B2B] font-bold rounded shadow-md hover:bg-[#c2e05a] transition-colors"
                    >
                        Proceed to Confirm Booking
                    </button>
                </div>

            </form>
        </div>
    );
};

export default SendParcel;
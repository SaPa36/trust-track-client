import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const UpdateParcel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [allData, setAllData] = useState([]);
    const [uniqueRegions, setUniqueRegions] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    // 1. Fetch the specific parcel data
    const { data: parcel, isLoading } = useQuery({
        queryKey: ['parcel', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${id}`);
            return res.data;
        },
        onSuccess: (data) => {
            reset(data); // This automatically fills the form fields with DB values
        }
    });

    // 2. Fetch service center JSON (Same as SendParcel)
    useEffect(() => {
        fetch('/serviceCenter.json')
            .then(res => res.json())
            .then(data => {
                setAllData(data);
                const regions = [...new Set(data.map(item => item.region))];
                setUniqueRegions(regions);
            });
    }, []);

    // 3. Effect to reset form once parcel data is loaded
    useEffect(() => {
        if (parcel) {
            reset(parcel);
        }
    }, [parcel, reset]);

    const selectedParcelType = watch("parcelType");
    const weight = watch("weight") || 0;
    const selectedSenderRegion = watch("senderRegion");
    const selectedReceiverRegion = watch("receiverRegion");

    const calculateCost = (data) => {
        const isWithinCity = data.senderRegion === data.receiverRegion;
        let total = 0;
        if (data.parcelType === 'Document') {
            total = isWithinCity ? 60 : 80;
        } else {
            const basePrice = isWithinCity ? 110 : 150;
            total = weight <= 3 ? basePrice : basePrice + ((weight - 3) * 40);
        }
        return total;
    };

    const senderCenters = allData.filter(item => item.region === selectedSenderRegion);
    const receiverCenters = allData.filter(item => item.region === selectedReceiverRegion);

    const onSubmit = async (data) => {
        const finalCost = calculateCost(data);
        const updatedDoc = { ...data, cost: finalCost };

        try {
            // CHANGED TO PATCH
            const res = await axiosSecure.patch(`/parcels/${id}`, updatedDoc);

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Parcel updated!", "success");
                navigate('/dashboard/myParcels');
            } else {
                Swal.fire("No changes", "You didn't modify anything", "info");
            }
        } catch (err) {
            Swal.fire("Error", "Update failed", "error");
        }
    };

    if (isLoading) return <div className="p-20 text-center font-bold">Loading Parcel Data...</div>;

    return (
        <div className="max-w-5xl mx-auto bg-white shadow-sm rounded-lg border border-slate-100">
            <h1 className="text-3xl text-center font-bold text-[#002B2B] mb-6 mt-4">Update Parcel</h1>

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
                        {/* CONDITIONAL WEIGHT INPUT */}
                        <div>
                            <label className={`block text-xs font-bold mb-1 ${selectedParcelType === 'Document' ? 'text-slate-300' : 'text-slate-500'}`}>
                                Parcel Weight (KG) {selectedParcelType === 'Document' && "(Disabled for Documents)"}
                            </label>
                            <input
                                type="number"
                                {...register("weight", {
                                    required: selectedParcelType === 'Not-Document' ? "Weight is required" : false
                                })}
                                // Disable if Document is selected
                                disabled={selectedParcelType === 'Document'}
                                placeholder="Parcel Weight (KG)"
                                className={`w-full p-2 border rounded focus:outline-[#9ACD32] transition-colors ${selectedParcelType === 'Document'
                                    ? 'bg-slate-100 border-slate-200 cursor-not-allowed opacity-50'
                                    : 'border-slate-300 bg-white'
                                    }`}
                            />
                            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>}
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

                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Contact No</label>
                                    <input {...register("senderContact")} placeholder="Sender Contact No" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                                </div>

                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Region</label>
                                    <select {...register("senderRegion")} className="w-full p-2 border border-slate-300 rounded text-slate-400 focus:outline-[#9ACD32]">
                                        <option value="">Select your region</option>
                                        {uniqueRegions.map(reg => (
                                            <option key={reg} value={reg}>{reg}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Dependent Service Center Selection */}
                                <div className="flex flex-col">
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Sender Service Center</label>
                                    <select
                                        {...register("senderWarehouse")}
                                        disabled={!selectedSenderRegion}
                                        className="w-full p-2 border border-slate-300 rounded text-slate-700 focus:outline-[#9ACD32] disabled:bg-slate-50"
                                    >
                                        <option value="">{selectedSenderRegion ? "Select Center" : "First select region"}</option>
                                        {senderCenters.map(center => (
                                            <option key={center.district} value={center.district}>
                                                {center.district}
                                            </option>
                                        ))}
                                    </select>
                                </div>



                            </div>


                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Sender Warehouse</label>
                                <input {...register("senderAddress")} placeholder="Address" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />

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
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Contact No</label>
                                    <input {...register("receiverContact")} placeholder="Receiver Contact No" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                                </div>

                            </div>


                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Region</label>
                                    <select {...register("receiverRegion")} className="w-full p-2 border border-slate-300 rounded text-slate-400 focus:outline-[#9ACD32]">
                                        <option value="">Select your region</option>
                                        {uniqueRegions.map(reg => (
                                            <option key={reg} value={reg}>{reg}</option>
                                        ))}
                                    </select>

                                </div>

                                {/* Receiver Service Center */}
                                <div className='flex flex-col'>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Service Center</label>
                                    <select
                                        {...register("receiverWarehouse")}
                                        disabled={!selectedReceiverRegion}
                                        className="w-full p-2 border border-slate-300 rounded text-slate-700 focus:outline-[#9ACD32] disabled:bg-slate-50"
                                    >
                                        <option value="">{selectedReceiverRegion ? "Select Center" : "First select region"}</option>
                                        {receiverCenters.map(center => (
                                            <option key={center.district} value={center.district}>
                                                {center.district}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Receiver Address</label>
                                <input {...register("receiverAddress")} placeholder="Address" className="w-full p-2 border border-slate-300 rounded focus:outline-[#9ACD32]" />
                            </div>

                            <div className='flex flex-col'>
                                <label className="block text-xs font-bold text-slate-500 mb-1">Delivery Instruction</label>
                                <textarea {...register("deliveryInstruction")} placeholder="Delivery Instruction" className="w-full p-2 border border-slate-300 rounded h-24 focus:outline-[#9ACD32]" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom Info & Submit */}


                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
                    <div>
                        <p className="text-sm font-semibold text-[#002B2B]">
                            ➤ PickUp Time 4pm-7pm Approx.
                        </p>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Estimated Cost</p>
                        <h2 className="text-2xl font-black text-[#9ACD32]">৳{calculateCost(watch())}</h2>
                    </div>
                    <button type="submit" className="bg-[#9ACD32] text-[#002B2B] px-10 py-3 rounded font-bold shadow-lg hover:bg-[#88bc28]">
                        Update Booking
                    </button>
                </div>


            </form>
        </div>
    );
};

export default UpdateParcel;
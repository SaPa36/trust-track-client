import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Edit3, Trash2, AlertCircle, Calendar, Package, ReceiptText } from 'lucide-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // TanStack Query Logic
    const { data: parcels = [], isLoading, error, refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`parcels?email=${user.email}`);
            return res.data;
        },
    });

    // Cancel Logic
    const handleCancel = async (id, status) => {
        if (status !== 'pending') {
            return Swal.fire("Cannot Cancel", "Only pending parcels can be cancelled.", "error");
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this booking?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#002B2B",
            confirmButtonText: "Yes, cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/parcels/cancel/${id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
                    }
                } catch (err) {
                    Swal.fire("Error", "Something went wrong", "error");
                }
            }
        });
    };

    if (isLoading) return <div className="p-10 text-center font-bold text-[#002B2B] animate-pulse">Loading your dashboard...</div>;

    if (error) return <div className="p-10 text-center text-red-500">Error loading data: {error.message}</div>;

    return (
        <div className="w-full animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#002B2B]">My Parcels</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track your delivery bookings</p>
                </div>
                <div className="bg-trust-lime border border-[#9ACD32]/20 px-4 py-2 rounded-xl text-trust-dark flex items-center gap-2">
                    <ReceiptText size={18} />
                    <span className="font-bold text-lg">{parcels.length}</span>
                    <span className="text-xs uppercase tracking-wider font-medium opacity-70">Total Bookings</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Type & Title</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Booked Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Cost</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {parcels.map((parcel, index) => (
                                <tr key={parcel._id} className="hover:bg-slate-50/80 transition-all group">
                                    {/* INDEX */}
                                    <td className="px-4 py-4 text-sm font-medium text-slate-400">
                                        {index + 1}
                                    </td>

                                    {/* TYPE & TITLE */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-[#9ACD32]/20 group-hover:text-[#002B2B] transition-colors">
                                                <Package size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 leading-tight">{parcel.parcelName}</p>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter mt-1">{parcel.parcelType}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* CREATED AT */}
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span>{new Date(parcel.createdAt).toLocaleDateString('en-GB')}</span>
                                        </div>
                                    </td>

                                    {/* COST */}
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#002B2B]">৳{parcel.cost}</div>
                                    </td>

                                    {/* PAYMENT STATUS */}
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                            parcel.payment_status === 'paid' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-amber-100 text-amber-700'
                                        }`}>
                                            {parcel.payment_status || 'pending'}
                                        </span>
                                    </td>

                                    {/* DELIVERY STATUS */}
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                            parcel.delivery_status === 'delivered' 
                                            ? 'bg-emerald-100 text-emerald-700' 
                                            : 'bg-slate-100 text-slate-500'
                                        }`}>
                                            {parcel.delivery_status?.replace('_', ' ')}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link 
                                                to={`/dashboard/updateParcel/${parcel._id}`}
                                                className={`p-2 rounded-lg transition-all ${
                                                    parcel.delivery_status !== 'pending' 
                                                    ? 'text-slate-300 cursor-not-allowed' 
                                                    : 'text-blue-500 hover:bg-blue-50'
                                                }`}
                                                title="Edit Booking"
                                            >
                                                <Edit3 size={18} />
                                            </Link>
                                            <button 
                                                onClick={() => handleCancel(parcel._id, parcel.delivery_status)}
                                                disabled={parcel.delivery_status !== 'pending'}
                                                className={`p-2 rounded-lg transition-all ${
                                                    parcel.delivery_status !== 'pending' 
                                                    ? 'text-slate-300 cursor-not-allowed' 
                                                    : 'text-red-500 hover:bg-red-50'
                                                }`}
                                                title="Cancel Booking"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {parcels.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                        <AlertCircle size={60} className="mb-4 opacity-10" />
                        <p className="font-bold text-xl text-slate-500">No Parcels Booked</p>
                        <p className="text-sm">Bookings you create will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyParcel;
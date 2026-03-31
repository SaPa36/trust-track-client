import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { CreditCard, Calendar, Hash, AlertCircle, ReceiptText, CheckCircle2 } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-20 text-center animate-pulse text-[#002B2B] font-bold text-xl">Loading History...</div>;

    return (
        <div className="w-full animate-in fade-in duration-500 ">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#002B2B]">Payment History</h1>
                    <p className="text-slate-500 text-sm mt-1">Review your successful transactions and receipts</p>
                </div>
                <div className="bg-trust-lime border border-[#9ACD32]/20 px-4 py-2 rounded-xl text-trust-dark flex items-center gap-2 shadow-sm">
                    <ReceiptText size={18} />
                    <span className="font-bold text-lg">{payments.length}</span>
                    <span className="text-xs uppercase tracking-wider font-medium opacity-70">Total Payments</span>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="px-4 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">#</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction Info</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Amount Paid</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-slate-50/80 transition-all group">
                                    {/* INDEX */}
                                    <td className="px-4 py-4 text-sm font-medium text-slate-400">
                                        {index + 1}
                                    </td>

                                    {/* TRANSACTION INFO */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-[#9ACD32]/20 group-hover:text-[#002B2B] transition-colors">
                                                <Hash size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 leading-tight font-mono text-xs tracking-tight">
                                                    {payment.transactionId}
                                                </p>
                                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter mt-1 flex items-center gap-1">
                                                    <CreditCard size={10} /> {payment.paymentMethod || 'Card'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* PAID AT */}
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-400" />
                                            <span>{new Date(payment.paid_at).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: 'short',
                                                year: 'numeric'
                                            })}</span>
                                        </div>
                                    </td>

                                    {/* AMOUNT */}
                                    <td className="px-6 py-4">
                                        <div className="font-black text-[#002B2B] text-lg">৳{payment.amount}</div>
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center">
                                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">
                                                <CheckCircle2 size={12} />
                                                Success
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                        <AlertCircle size={60} className="mb-4 opacity-10" />
                        <p className="font-bold text-xl text-slate-500">No Payment History</p>
                        <p className="text-sm">Your successful transactions will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
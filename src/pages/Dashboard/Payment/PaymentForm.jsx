import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const {data: parcelInfo, isLoading} = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            // Simulate an API call to fetch parcel information
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="p-10 text-center font-bold text-[#002B2B] animate-pulse">Loading payment details...</div>;
    }

    if (!parcelInfo) {
        return <div className="p-10 text-center font-bold text-[#002B2B]">Parcel not found</div>;
    }

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError(null);

        }

        
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            });

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                console.log('[Payment Confirmation Error]', result.error);
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Payment succeeded, you can update your backend or show a success message
                    console.log('Payment successful!');
                    console.log(result);
                }
    };

}

    return (
        <div className="max-w-md mx-auto mt-5  bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header Decor */}
        <div className="bg-[#002B2B] p-6 text-white flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold">Secure Payment</h3>
                <p className="text-xs opacity-70">Step 2 of 2: Card Details</p>
            </div>
            <div className="bg-[#9ACD32]/20 p-3 rounded-full">
                <CreditCard className="text-[#9ACD32]" size={24} />
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                    Credit or Debit Card
                </label>
                
                {/* The Container for Stripe Input */}
                <div className="group transition-all duration-300 border-2 border-slate-100 rounded-xl p-4 bg-slate-50 focus-within:border-[#9ACD32] focus-within:bg-white focus-within:shadow-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#002B2B',
                                    fontFamily: 'Inter, sans-serif',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#ef4444',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Price Display */}
            <div className="flex justify-between items-center py-4 border-t border-b border-slate-50">
                <span className="text-slate-500 font-medium">Total Amount:</span>
                <span className="text-2xl font-black text-[#002B2B]">৳{amount || 0}</span>
            </div>

            {/* Pay Button */}
            <button
                type="submit"
                disabled={!stripe}
                className="w-full bg-[#9ACD32] hover:bg-[#86b528] text-[#002B2B] font-black py-4 rounded-xl shadow-lg shadow-[#9ACD32]/20 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                <Lock size={18} />
                Pay Now
            </button>

            {/* Error Message */}
            {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg animate-shake">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    {error}
                </div>
            )}

        
        </form>
    </div>
    );
};

export default PaymentForm;
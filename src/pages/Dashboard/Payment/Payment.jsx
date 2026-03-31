import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default Payment;
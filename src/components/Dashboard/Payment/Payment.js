import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const paymentInfo = useLoaderData();
    const navigation = useNavigation();
    const { bookName, price } = paymentInfo;
    if (navigation.state === 'loading') {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-xl font-bold'>Payment for: {bookName}</h2>
            <p className='text-xl'>Please Pay: <strong> ${price}</strong> for this book</p>
            <div className='mt-6 w-96'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        paymentInfo={paymentInfo}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
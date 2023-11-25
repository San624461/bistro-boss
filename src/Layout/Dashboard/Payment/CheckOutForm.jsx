import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxios from '../../../Hooks/useAxios';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const CheckOutForm = () => {
    const [error, setError] = useState('')
    const [transcationId, setTransectionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth()
    const axiosSecure = useAxios();
    const [cart,refetch] = useCart();

    const navigate =useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])
    const handleSubmit = async (event) => {

        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');
        }

        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transcation id', paymentIntent.id);
                setTransectionId(paymentIntent.id)

                //now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transcationId: paymentIntent.id,
                    date: new Date(), //utc date convert .use moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuItemId),
                    status: 'pending'

                }
                const res = await axiosSecure.post('/payments', payment);
                console.log('payment saved', res);
                refetch()
                if(res.data?.paymentResult?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for the payment",
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate('/dashboard/paymentHistory')
                }
            }
        }
    }
    return (
        <form action=""
            onSubmit={handleSubmit}
        >
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-sm btn-success' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className='text-red-600'>{error}</p>
            {transcationId && <p className='text-green-600'>Your transection id : {transcationId}</p>}
        </form>
    );

};

export default CheckOutForm;
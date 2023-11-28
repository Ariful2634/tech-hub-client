import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("")
    const [transactionId, setTransactionId]=useState('')
    const [clientSecret, setClientSecret]=useState('')
    const axiosSecure = useAxiosSecure()
    const {user}=useContext(AuthContext)
    const navigate = useNavigate()
    
    const price = 200;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if(!stripe || !elements){
        return
    }

    const card = elements.getElement(CardElement)

    if(card === null){
        return
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type:'card',
        card
    })

    if(error){
        console.log('payment error', error)
        setError(error.message)
    }
    else{
        console.log('payment method', paymentMethod)
        setError('')
    }

    // confirm payment

    const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonympus',
                name: user?.displayName || 'anonympus'
            }
        }
    })

    if(confirmError){
        console.log('confirm error')
    }
    else{
        console.log('payment intent', paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id', paymentIntent.id)
            setTransactionId(paymentIntent.id)

            // now save the payment in the database

            const payment={
                email: user.email,
                price: price,
                transactionId: paymentIntent.id,
                date: new Date(),  //utc date convert. use moment js to convert
                
                status: 'pending'
        }
        axiosSecure.post('/payments', payment)
        .then(res=>{
            console.log('payment saved',res.data)
            if(res.data?.paymentResult?.insertedId){
                // refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the payment",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/myProfile')
            }
        })

    }
}

}


    return (
        <div>
        <form onSubmit={handleSubmit}>
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
            <button className="btn btn-sm btn-success mt-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {
                    transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>
                }
        </form>
    </div>
    );
};

export default CheckoutForm;
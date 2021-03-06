import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ order }) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [transId, setTransId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { price, userName, userEmail, _id } = order;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://lit-brushlands-20447.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price: price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    setLoading(true);
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setTransId("");

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message || "");
      setLoading(false);
    } else {
      setTransId(paymentIntent.id);
      setCardError("");
      setSuccess("Congrats! your payment is completed");
      toast.success("Congrats! your payment is completed");
      setLoading(false);
      // store payment on database
      const payment = {
        orderId: _id,
        tranSactionId: paymentIntent.id,
      };
      fetch(`https://lit-brushlands-20447.herokuapp.com/order/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-success btn-sm mt-5 text-white"
          disabled={!stripe || !clientSecret || loading}
        >
          Pay
        </button>
      </form>
      <Link to="/dashboard/myOrders" className="btn btn-sm mt-3">
        Back to my orders
      </Link>
      {cardError && <p className="text-error mt-1">{cardError}</p>}
      {success && <p className="text-success mt-1">{success}</p>}
      {transId && (
        <p className="text-info mt-1">
          Your Transaction ID :{" "}
          <span className="text-orange-500">{transId}</span>
        </p>
      )}
    </>
  );
};

export default CheckoutForm;

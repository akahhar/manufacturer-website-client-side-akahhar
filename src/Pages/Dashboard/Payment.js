import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L2y55JuzoX3HtZwACmRTw2BmjNpr4LAFcc7YrF1RGP8VDr3cYJhDSBZRi490ryHD1CBd37H7iomF6tALzDcLqgS00bHhaKx7X"
);

const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/order/${id}`;
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(["order", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }
  console.log(order);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      <div className="card  bg-base-100 shadow-xl mb-5">
        <div className="card-body">
          <h2 className="card-title">Hello, {order.userName}</h2>
          <h2 className="text-xl">Address : {order.address}</h2>
          <h2 className="text-xl">Phone : {order.phone}</h2>

          <p className="font-bold">
            Please pay for : <span className="text-primary">{order.name}</span>
          </p>
          <h2 className="text-xl">
            Please pay : <span className="text-error">${order.price}</span>
          </h2>
          <p className="font-bold">Quantity : {order.quantity}</p>
          <div className="mt-5">
            <Elements stripe={stripePromise}>
              <CheckoutForm order={order} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

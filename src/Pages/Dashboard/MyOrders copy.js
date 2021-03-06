import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import auth from "../../firebase.init";
import DeleteModal from "../Shared/DeleteModal";
import Loading from "../Shared/Loading";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [delModal, setDelModal] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(
      `https://lit-brushlands-20447.herokuapp.com/orders?email=${user.email}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Product name : {}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Sr.N</th>
            <th>User Name</th>
            <th>Email Address</th>
            <th>Address</th>
            <th>Product Name</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {orders?.map((order, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{order.userName}</td>
              <td>{order.userEmail}</td>
              <td>{order.address}</td>
              <td>{order.name}</td>
              <td>{order.phone}</td>
              <td>{order.quantity}</td>
              <td>${order.price}</td>
              <td>
                {!order.paid && (
                  <Link
                    to={`/dashboard/payment/${order._id}`}
                    className="btn btn-xs btn-warning text-white"
                  >
                    Pay Here
                  </Link>
                )}
                {order.paid && (
                  <button className="btn btn-xs btn-success text-white">
                    Paid
                  </button>
                )}
              </td>
              <td>
                {order.paid ? (
                  ""
                ) : (
                  <label
                    onClick={() => setDelModal(order)}
                    htmlFor="my-modal-3"
                    className="btn btn-xs btn-error text-white"
                  >
                    Delete
                  </label>
                )}
              </td>
              {/* <td>
                <button
                  className="btn btn-xs btn-error"
                  onClick={() => deleteAction(order._id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {delModal && (
        <DeleteModal
          refetch={refetch}
          setDelModal={setDelModal}
          delModal={delModal}
        />
      )}
    </div>
  );
};

export default MyOrders;

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
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
  } = useQuery("users", () =>
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto">
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
                <label
                  onClick={() => setDelModal(order)}
                  htmlFor="my-modal-3"
                  className="btn btn-xs btn-error text-white"
                >
                  Delete
                </label>
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

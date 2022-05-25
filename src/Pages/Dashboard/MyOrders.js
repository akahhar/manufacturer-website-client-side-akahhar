import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
    fetch(`http://localhost:5000/orders?email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const deleteAction = (delData) => {
    fetch(`http://localhost:5000/order/${delData._id}`, {
      method: "delete",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          setDelModal(null);
          toast.success(`${delData.name} Successfully Delete!`);
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      {orders &&
        orders?.map((order) => (
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Product name : {order.name}</h2>
              <p>Name : {order.userName}</p>
              <p>Email : {order.userEmail}</p>
              <p>Address : {order.address}</p>
              <p>Phone : {order.phone}</p>
              <p>
                Quantity :{" "}
                <span className="text-green-600 font-bold">
                  {order.quantity}
                </span>
              </p>
              <p>
                Price : <span className="text-orange-500">{order.price}</span>
              </p>
              <div className="flex justify-between">
                <div>
                  {order.paid ? (
                    <span className="text-sm">
                      Transaction id :
                      <span className="text-orange-400">
                        {" "}
                        {order.tranSactionId}
                      </span>
                    </span>
                  ) : (
                    <label
                      onClick={() => setDelModal(order)}
                      htmlFor="my-modal-3"
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </label>
                  )}
                </div>
                <div>
                  {!order?.paid ? (
                    <Link
                      to={`/dashboard/payment/${order._id}`}
                      className="btn btn-xs btn-warning text-white"
                    >
                      Pay Here
                    </Link>
                  ) : order?.status ? (
                    <button className="btn btn-xs btn-success text-white">
                      Paid
                    </button>
                  ) : (
                    <button className="btn btn-xs btn-error text-white">
                      Pending
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

      {delModal && (
        <DeleteModal
          refetch={refetch}
          setDelModal={setDelModal}
          delModal={delModal}
          deleteAction={deleteAction}
        />
      )}
    </div>
  );
};

export default MyOrders;

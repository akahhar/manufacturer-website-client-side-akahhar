import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import DeleteModal from "../Shared/DeleteModal";
import Loading from "../Shared/Loading";
import ProductDetailsModel from "./ProductDetailsModel";

const MyOrders = () => {
  const [user] = useAuthState(auth);
  const [delModal, setDelModal] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`https://lit-brushlands-20447.herokuapp.com/orders/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const deleteAction = (delData) => {
    fetch(`https://lit-brushlands-20447.herokuapp.com/order/${delData._id}`, {
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
        orders?.map((order, index) => (
          <div key={index} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h2 className="card-title">Product name : {order.name}</h2>
                <label
                  htmlFor="my-modal-6"
                  className="btn btn-xs"
                  onClick={() => setProductDetails(order)}
                >
                  Details
                </label>
              </div>
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
      {productDetails && (
        <ProductDetailsModel productDetails={productDetails} />
      )}
    </div>
  );
};

export default MyOrders;

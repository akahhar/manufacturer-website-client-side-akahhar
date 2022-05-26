import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import DeleteModal from "../Shared/DeleteModal";
import Loading from "../Shared/Loading";
import ProductDetailsModel from "./ProductDetailsModel";

const ManageAllOrders = () => {
  const [delModal, setDelModal] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/getOrders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const setAction = (id) => {
    fetch(`http://localhost:5000/order/admin/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Your product has shipped");
          refetch();
        }
      });
    // .catch((error) => toast.warning(error.message));
  };

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
          <div key={order._id} className="card bg-base-100 shadow-xl">
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
                    <button className="btn btn-xs btn-warning text-white">
                      Unpaid
                    </button>
                  ) : order?.status ? (
                    <button className="btn btn-xs btn-success text-white">
                      Shipped
                    </button>
                  ) : (
                    <button className="btn btn-xs btn-error text-white">
                      Pending
                    </button>
                  )}
                </div>
              </div>

              {order.paid && (
                <div className="card-actions justify-start">
                  Status :
                  {order?.status ? (
                    <button className="btn btn-xs btn-primary text-white">
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => setAction(order._id)}
                      className="btn btn-xs btn-secondary text-white"
                    >
                      Approve Now ?
                    </button>
                  )}
                </div>
              )}
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

export default ManageAllOrders;

import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import DeleteModal from "../Shared/DeleteModal";
import Loading from "../Shared/Loading";

const ManageProducts = () => {
  const [delModal, setDelModal] = useState(null);
  const {
    data: tools,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch(`http://localhost:5000/getToolsByAdmin`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const deleteAction = (delData) => {
    fetch(`http://localhost:5000/deleteTool/${delData._id}`, {
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
  console.log(tools);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {tools &&
        tools?.map((tool) => (
          <div class="card bg-base-100 shadow-xl">
            <figure>
              <img src={tool.image} alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">{tool.name}</h2>

              <p>{tool.description}</p>
              <h3>Minimum Order Quantity : {tool.minimumOrderQuantity}</h3>
              <h3>Available Quantity : {tool.availableQuantity}</h3>
              <h3>Price : {tool.price}</h3>
              <div class="card-actions justify-end">
                <div class="btn btn-xs btn-primary">Edit</div>
                <label
                  onClick={() => setDelModal(tool)}
                  htmlFor="my-modal-3"
                  className="btn btn-xs btn-error text-white"
                >
                  Delete
                </label>
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

export default ManageProducts;

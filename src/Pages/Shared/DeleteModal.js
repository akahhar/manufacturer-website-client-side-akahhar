import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ delModal, refetch, setDelModal }) => {
  const { name, _id } = delModal;

  const deleteAction = (id) => {
    fetch(`http://localhost:5000/order/${id}`, {
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
          toast.success(`${name} Successfully Delete!`);
        }
      });
  };
  return (
    <div>
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <h3 className="text-lg font-bold text-red-700">
            Are you sure want to delete {name} ?
          </h3>

          <div className="modal-action">
            <label htmlFor="my-modal-3" className="btn btn-success">
              CANCEL
            </label>
            <label
              htmlFor="my-modal-3"
              onClick={() => deleteAction(_id)}
              className="btn btn-error"
            >
              DELETE
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

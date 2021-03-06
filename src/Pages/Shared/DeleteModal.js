import React from "react";

const DeleteModal = ({ delModal, refetch, setDelModal, deleteAction }) => {
  const { name, _id } = delModal;

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
              onClick={() => deleteAction(delModal)}
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

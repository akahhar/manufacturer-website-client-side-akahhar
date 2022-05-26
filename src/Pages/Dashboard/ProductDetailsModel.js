import React from "react";

const ProductDetailsModel = ({ productDetails }) => {
  const {
    image,
    name,
    address,
    phone,
    price,
    quantity,
    tranSactionId,
    userEmail,
    userName,
    _id,
  } = productDetails;
  return (
    <div>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            for="my-modal-6"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="card">
            <figure className="px-10 pt-10">
              <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Product name : {name}</h2>
              <p>Email : {userEmail}</p>
              <p>Address : {address}</p>
              <p>Phone Number : {phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModel;

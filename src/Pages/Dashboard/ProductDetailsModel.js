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
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-6"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div class="card">
            <figure class="px-10 pt-10">
              <img src={image} alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
              <h2 class="card-title">Product name : {name}</h2>
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

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Tool = ({ tool }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    image,
    description,
    minimumOrderQuantity,
    availableQuantity,
    price,
  } = tool;

  return (
    <div className="card border border-sky-150 rounded-none">
      <div className="card-body">
        <img className="border border-sky-150" src={image} alt="" />
        <h2 className="card-title text-base grid">{name}</h2>
        <p className="text-sm">{description}</p>
        <h4>Minimum Order Quantity : {minimumOrderQuantity}</h4>
        <h4>Available Quantity : {availableQuantity}</h4>
        <span>Price : ${price}(per unit price)</span>
        <div className="card-actions mt-3">
          <Link
            to={`/purchase/${_id}`}
            className="btn btn-primary btn-sm rounded-2xl text-white"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Tool;

import React from "react";

const Service = ({ img, title, content }) => {
  return (
    <div className="card bg-base-100 shadow-xl mb-10">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Service;

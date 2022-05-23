import React from "react";
import { BsFillStarFill } from "react-icons/bs";

const Review = ({ review }) => {
  const { name, numberOfRating, description } = review;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base grid">Name : {name}</h2>
        <p className="text-sm">{description}</p>
        <BsFillStarFill />
        <h4>
          {numberOfRating > 1
            ? `Ratings : ${numberOfRating}`
            : `Rating : ${numberOfRating}`}
        </h4>
      </div>
    </div>
  );
};

export default Review;

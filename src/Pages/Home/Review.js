import React from "react";
import { BsFillStarFill } from "react-icons/bs";

const Review = ({ review }) => {
  const { name, ratting, description } = review;
  return (
    <div className="card  bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-base grid">Name : {name}</h2>
        <p className="text-sm">{description}</p>

        <h4>
          {ratting === "5" ? (
            <div className="flex">
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
            </div>
          ) : ratting === "4" ? (
            <div className="flex">
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
            </div>
          ) : ratting === "3" ? (
            <div className="flex">
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
            </div>
          ) : ratting === "2" ? (
            <div className="flex">
              <BsFillStarFill />
              <BsFillStarFill />
            </div>
          ) : (
            <BsFillStarFill />
          )}
        </h4>
      </div>
    </div>
  );
};

export default Review;

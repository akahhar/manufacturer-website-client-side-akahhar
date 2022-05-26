import React from "react";
import { BsFillStarFill } from "react-icons/bs";

const Review = ({ review }) => {
  const { name, ratting, description } = review;
  return (
    <div className="component flex max-w-lg">
      <div className="w-full rounded-lg bg-gray-100 relative p-8">
        <div className="flex justify-between">
          <div className="flex">
            <div className="ml-4">
              <div className="font-bold">{name}</div>
              <div className="mt-1 text-xs text-gray-500">
                Posted 5 Days Ago
              </div>
            </div>
          </div>
          <div className="text-yellow-400 flex items-center">
            <h4>
              {ratting === "5" ? (
                <>
                  <div className="flex">
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                    <BsFillStarFill />
                  </div>
                </>
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
        <div className="my-6 border-b"></div>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
};

export default Review;

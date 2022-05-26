import axios from "axios";
import { useEffect, useState } from "react";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await axios.get(`http://localhost:5000/getReviews`);
      setReviews(data);
    };
    getReviews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-10 pb-20">
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          Customers Reviews
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          A customer review is a reflection
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;

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
      <div className="text-xl text-center font-bold mb-10 section-header">
        <h3>Top Reviews from the Customers</h3>
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

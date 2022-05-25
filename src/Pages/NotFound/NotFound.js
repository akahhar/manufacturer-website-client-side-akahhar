import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/images/notFound.jpg";
import "./NotFound.css";
const NotFound = () => {
  return (
    <div className="text-center">
      <div className="awr">
        <div className="flex justify-center">
          <img src={notFound} alt="" />
        </div>
        <h2>Oops... the page you are looking for doesn't exist.</h2>
        <Link className="text-green-400" to="/">
          Click here
        </Link>{" "}
        to return to the homepage
      </div>
    </div>
  );
};

export default NotFound;

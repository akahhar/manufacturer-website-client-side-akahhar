import React from "react";
import img from "../../assets/images/profile.jpg";
import "./MyPortfolio.css";
const MyPortfolio = () => {
  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20">
      <div className="hero min-h-screen bg-blue-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={img} alt="" />
          <div>
            <h1 className="text-2xl font-bold">Name : Abdul Kahhar Nayeem</h1>
            <h2 className="text-xl font-bold">
              Email Address : nayeem@codexcube.com
            </h2>
            <h2 className="text-xl font-bold">
              Educational background : Daffodil international university
              department of CSE
            </h2>
            <ul className="list-skill my-3">
              <li>HTML5 and CSS3.</li>
              <li>Bootstrap 5</li>
              <li>Tailwind</li>
              <li>JavaScript</li>
              <li>PHP</li>
              <li>Codeigniter 3</li>
              <li>React</li>
              <li>Express js</li>
            </ul>
            <h2>Three of my projects (live website links) here.</h2>
            <a className="text-green-500" href="https://ziscoerp.com/">
              ziscoerp.com
            </a>
            <br></br>
            <a className="text-green-500" href="https://hrm.codexcube.com/">
              hrm.codexcube.com
            </a>
            <br></br>
            <a className="text-green-500" href="http://codexcube.com/">
              Codexcube.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;

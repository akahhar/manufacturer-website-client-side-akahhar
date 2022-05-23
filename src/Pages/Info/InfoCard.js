import React from "react";

const InfoCard = ({ img, bgClass, cardTitle }) => {
  return (
    <div class={`card lg:card-side shadow-xl p-4 ${bgClass}`}>
      <figure>
        <img src={img} alt="clock" />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{cardTitle}</h2>
        <p>Lorem Ipsum is simply dummy text of the pri</p>
      </div>
    </div>
  );
};

export default InfoCard;

import React from "react";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";
import InfoCard from "./InfoCard";
const Info = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-12">
      <InfoCard
        img={clock}
        cardTitle="Opening Hours"
        bgclassName="bg-gradient-to-r from-secondary to-primary"
      />
      <InfoCard
        img={marker}
        cardTitle="Visit our location"
        bgclassName="bg-accent"
      />
      <InfoCard
        img={phone}
        cardTitle="Contact us now"
        bgclassName="bg-gradient-to-r from-secondary to-primary"
      />
    </div>
  );
};

export default Info;

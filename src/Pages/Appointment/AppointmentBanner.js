import { format } from "date-fns";
import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import chair from "../../assets/images/chair.png";

const AppointmentBanner = ({ selected, setSelected }) => {
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }

  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={chair} className="max-w-sm rounded-lg shadow-2xl" alt="" />
        <div>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;

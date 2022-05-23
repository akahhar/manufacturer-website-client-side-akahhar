import React from "react";

const Service = ({ service, setTreatMent }) => {
  const { name, slots } = service;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title text-secondary justify-center">{name}</h2>
        <p>
          {slots?.length > 0 ? (
            <span>{slots[0]}</span>
          ) : (
            <span className="text-red-500">
              Not slot available. Tray another date
            </span>
          )}
        </p>
        <p>
          {slots?.length > 1
            ? `${slots?.length} SPACES AVAILABLE`
            : `${slots?.length} SPACE AVAILABLE`}
        </p>

        <div className="card-actions justify-center">
          <label
            htmlFor="booking-modal"
            onClick={() => setTreatMent(service)}
            className="btn btn-primary text-white	font-bold bg-gradient-to-r from-secondary to-primary"
            disabled={slots?.length === 0}
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;

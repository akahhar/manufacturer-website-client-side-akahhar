import React from "react";
import appointment from "../../assets/images/appointment.png";
import doctor from "../../assets/images/doctor.png";
import PrimaryButton from "../Shared/PrimaryButton";
const MakeAppointment = () => {
  return (
    <section
      className="flex justify-center items-center"
      style={{ background: `url(${appointment})` }}
    >
      <div className="flex-1 hidden lg:block">
        <img className="mt-[-115px]" src={doctor} alt="" />
      </div>
      <div className="flex-1 py-5 px-12 lg:px-0">
        <span className="text-primary">Appointment</span>
        <h2 className="text-3xl font-bold text-white py-5">
          Make an appointment Today
        </h2>
        <p className="text-white mb-5 lg:pr-20">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsumis that it has a more-or-less normal distribution of
          letters,as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page
        </p>
        <PrimaryButton>GET STARTED</PrimaryButton>
      </div>
    </section>
  );
};

export default MakeAppointment;

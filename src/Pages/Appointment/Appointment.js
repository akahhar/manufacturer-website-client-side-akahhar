import React, { useState } from "react";
import Footer from "../Shared/Footer";
import AppointmentBanner from "./AppointmentBanner";
import AvailableAppointments from "./AvailableAppointments";

const Appointment = () => {
  const [selected, setSelected] = useState(new Date());
  return (
    <div>
      <AppointmentBanner selected={selected} setSelected={setSelected} />
      <AvailableAppointments selected={selected} />
      <Footer />
    </div>
  );
};

export default Appointment;

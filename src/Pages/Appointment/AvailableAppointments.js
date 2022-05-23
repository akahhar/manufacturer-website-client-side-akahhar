import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import BookingModal from "./BookingModal";
import Service from "./Service";

const AvailableAppointments = ({ selected }) => {
  const [services, setServices] = useState([]);
  const [treatMent, setTreatMent] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getMyItems = async () => {
      const { data } = await axios.get(`http://localhost:5000/getServices`);
      setServices(data);
    };
    getMyItems();
    // fetch(`http://localhost:5000/getServices`)
    //   .then((res) => res.json())
    //   .then((data) => setServices(data));
  }, []);

  return (
    <section className="">
      <div className="text-center mb-10">
        <h2 className="text-secondary text-xl font-bold">
          Available Services on{format(selected, "PP")}
        </h2>
        <p className="text-neutral">Please select a service.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <Service
            key={service._id}
            service={service}
            setTreatMent={setTreatMent}
          ></Service>
        ))}
      </div>
      {treatMent && (
        <BookingModal
          treatMent={treatMent}
          date={selected}
          setTreatMent={setTreatMent}
          user={user}
        />
      )}
    </section>
  );
};

export default AvailableAppointments;

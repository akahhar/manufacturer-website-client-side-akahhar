import { format } from "date-fns";
import React from "react";
import { toast } from "react-toastify";

const BookingModal = ({ treatMent, date, setTreatMent, user }) => {
  const { _id, name, slots } = treatMent;
  const formattedDate = format(date, "PP");
  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    const url = `https://lit-brushlands-20447.herokuapp.com/booking`;

    const booking = {
      treatMentId: _id,
      date: formattedDate,
      slot: slot,
      treatMentName: name,
      patientName: user.displayName,
      patientEmail: user.email,
      phone: event.target.phone.value,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(`Appointment is set, ${formattedDate} at ${slot}`);
        } else {
          toast.error(
            `You already have an appointment on ${data.booking?.date} at ${data.booking?.slot}`
          );
        }
        setTreatMent(null);
      })
      .catch((error) => toast.warning(error.message));
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-10">Booking for : {name}</h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              disabled
              name="date"
              value={formattedDate}
              className="input input-bordered w-full mb-3"
            />
            <select name="slot" className="select select-bordered w-full mb-3">
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              value={user?.displayName || ""}
              placeholder="Full Name"
              className="input input-bordered w-full mb-3"
              disabled
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full mb-3"
            />
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              placeholder="Email"
              className="input input-bordered w-full mb-3"
              disabled
            />
            <input
              type="submit"
              value="submit"
              className="btn btn-accent w-full"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

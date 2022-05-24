import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const MyProfile = () => {
  const [user, loading] = useAuthState(auth);

  const [profile, setProfile] = useState({
    education: "",
    location: "",
    number: "",
    link: "",
  });

  const { education, location, number, link } = profile;

  const onInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getReviews = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/getUserProfile/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setProfile(data);
    };
    getReviews();
  }, [user.email]);

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:5000/userProfile/${user.email}`;

    const profile = {
      name: user.displayName,
      email: user.email,
      education: e.target.education.value,
      location: e.target.location.value,
      number: e.target.number.value,
      link: e.target.link.value,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(profile),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Profile update successfully");
        } else {
          toast.success("Profile save successfully");
        }
      })
      .catch((error) => toast.warning(error.message));
  };
  return (
    <div className="card bg-base-100  shadow-xl">
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <h2 className="font-bold mb-5">My Profile</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="form-control ">
              <label className="label">
                <span className="label-userName">User Name</span>
              </label>
              <input
                type="text"
                value={user.displayName || ""}
                disabled
                className="input input-bordered"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-userName">Email</span>
              </label>
              <input
                type="text"
                value={user.email || ""}
                disabled
                className="input input-bordered"
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-education">Education</span>
              </label>
              <input
                type="text"
                name="education"
                onChange={(e) => onInputChange(e)}
                value={education || ""}
                placeholder="Type education"
                className="input input-bordered ratting"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-location">Location (city/district)</span>
              </label>
              <input
                name="location"
                onChange={(e) => onInputChange(e)}
                type="text"
                value={location || ""}
                placeholder="Type location city/district"
                className="input input-bordered ratting"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-number">Phone number</span>
              </label>
              <input
                name="number"
                onChange={(e) => onInputChange(e)}
                type="number"
                value={number || ""}
                placeholder="Type number "
                className="input input-bordered ratting"
              />
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-link">LinkedIn profile link</span>
              </label>
              <input
                name="link"
                onChange={(e) => onInputChange(e)}
                value={link || ""}
                type="text"
                placeholder="Type link"
                className="input input-bordered ratting"
              />
            </div>
          </div>

          <div className="card-actions mt-3">
            <button className="btn btn-accent">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;

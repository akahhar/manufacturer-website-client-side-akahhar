import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AddReview = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const url = `http://localhost:5000/addReview`;

    const review = {
      name: user.displayName,
      description: data.description,
      ratting: data.ratting,
    };
    console.log(review);
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          navigate("/home");
        }
      })
      .catch((error) => toast.warning(error.message));
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="card-body" id="login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="font-bold mb-5">Add a Review</h2>
              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-userName">User Name</span>
                </label>
                <input
                  {...register("userName", {
                    required: {
                      value: true,
                      message: "User Name is required",
                    },
                    minLength: {
                      value: 4,
                      message: "Must be 4 characters or longer", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  type="text"
                  value={user.displayName || ""}
                  placeholder="Type User Name"
                  className="input input-bordered w-full"
                />

                {errors.userName?.type === "required" && (
                  <p className="text-red-500">{errors.userName.message}</p>
                )}
                {errors.userName?.type === "minLength" && (
                  <p className="text-red-500">{errors.userName.message}</p>
                )}
              </div>
              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-description">Description</span>
                </label>
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  type="textarea"
                  placeholder="Type Description"
                  className="input input-bordered w-full"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                    minLength: {
                      value: 5,
                      message: "Min 5 characters or longer", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                ></textarea>

                {errors.description?.type === "required" && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
                {errors.description?.type === "minLength" && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-ratting">Ratting</span>
                </label>
                <input
                  {...register("ratting", {
                    required: {
                      value: true,
                      message: "Ratting is required",
                    },
                    max: {
                      value: 5,
                      message: "Minimum 1 & Maximum Ratting 5", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  type="number"
                  placeholder="Type Ratting 1-5"
                  className="input input-bordered w-full"
                />
                {errors.ratting?.type === "required" && (
                  <p className="text-red-500">{errors.ratting.message}</p>
                )}
                {errors.ratting?.type === "max" && (
                  <p className="text-red-500">{errors.ratting.message}</p>
                )}
              </div>

              <div className="card-actions">
                <button className="btn btn-accent">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Purchase = () => {
  const [user, loading, error] = useAuthState(auth);
  const [quantity2, setQuantity] = useState({ minimumOrderQuantity: "" });
  const [first, setfirst] = useState({});
  const { minimumOrderQuantity, availableQuantity } = quantity2;
  const onInputChange = (e) => {
    setQuantity({
      ...quantity2,
      minimumOrderQuantity: e.target.value,
    });
  };

  const { itemId } = useParams();

  useEffect(() => {
    const url = `http://localhost:5000/item/${itemId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuantity(data);
        setfirst(data.minimumOrderQuantity);
      });
  }, [itemId]);
  console.log(availableQuantity);
  if (first === minimumOrderQuantity || first < minimumOrderQuantity) {
    console.log(true);
  } else {
    console.log(false);
  }

  if (availableQuantity < minimumOrderQuantity) {
    console.log("no0000000");
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const onSubmit = async (data) => {};
  const onSubmit2 = async (data) => {
    console.log(data);
  };

  if (loading) {
    <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto pt-10 pb-20">
      <div className="text-xl text-center font-bold mb-10 section-header">
        <h3>Detailed information about the item</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="card-body" id="login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="font-bold mb-5">User information</h2>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-userName">User Name</span>
                </label>
                <input
                  {...register("userName")}
                  type="text"
                  value={user.displayName || ""}
                  disabled
                  placeholder="Type User Name"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-email">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  value={user.email || ""}
                  disabled
                  placeholder="Type email"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-address">Address</span>
                </label>
                <input
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                    minLength: {
                      value: 4,
                      message: "Must be 4 characters or longer", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  type="text"
                  placeholder="Type Address"
                  className="input input-bordered w-full"
                />

                {errors.address?.type === "required" && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
                {errors.address?.type === "minLength" && (
                  <p className="text-red-500">{errors.address.message}</p>
                )}
              </div>
              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-phoneNumber">Phone Number</span>
                </label>
                <input
                  {...register("phoneNumber", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    minLength: {
                      value: 4,
                      message: "Must be 4 characters or longer", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  type="number"
                  placeholder="Type Phone Number"
                  className="input input-bordered w-full"
                />

                {errors.phoneNumber?.type === "required" && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
                {errors.phoneNumber?.type === "minLength" && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="card-actions">
                <button className="btn btn-accent">
                  {false ? "Loading..." : "Place the order"}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-body" id="login">
            <form onSubmit={handleSubmit2(onSubmit2)}>
              <h2 className="font-bold mb-5">Quantity information </h2>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-quantity">Quantity : </span>
                </label>
                <input
                  {...register2("quantity", {
                    required: {
                      value: true,
                      message: "Quantity is required",
                    },
                  })}
                  name="quantity"
                  value={minimumOrderQuantity}
                  onChange={(e) => onInputChange(e)}
                  type="number"
                  placeholder="Type quantity"
                  className="input input-bordered w-full"
                />

                {errors2.quantity?.type === "required" && (
                  <p className="text-red-500">{errors2.quantity.message}</p>
                )}
                {errors2.quantity?.type === "minLength" && (
                  <p className="text-red-500">{errors2.quantity.message}</p>
                )}
              </div>

              <div className="card-actions">
                <button className="btn btn-accent">
                  {false ? "Loading..." : "Place the order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Purchase = () => {
  const { itemId } = useParams();
  const [items, setItems] = useState({});
  const [user, loading] = useAuthState(auth);
  const [item, setItem] = useState({
    name: "",
    image: "",
    description: "",
    minimumOrderQuantity: "",
    availableQuantity: "",
    price: "",
  });

  const {
    name,
    image,
    description,
    minimumOrderQuantity,
    availableQuantity,
    price,
  } = item;
  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  if (
    items.minimumOrderQuantity > parseInt(minimumOrderQuantity) ||
    items.availableQuantity < parseInt(minimumOrderQuantity)
  ) {
    toast.warning(
      `Minimum order : ${items.minimumOrderQuantity} and Maximum order : ${items.availableQuantity}`
    );
  }

  useEffect(() => {
    const url = `http://localhost:5000/item/${itemId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setItems(data);
      });
  }, [itemId]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading) {
    <Loading />;
  }

  const onSubmit = (data) => {
    const url = `http://localhost:5000/addOrder`;
    const order = {
      userName: user.displayName,
      userEmail: user.email,
      address: data.address,
      phone: data.phoneNumber,
      quantity: items.minimumOrderQuantity,
      price: price * minimumOrderQuantity,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => toast.warning(error.message));
  };

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

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-email">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email address is required",
                    },
                    pattern: {
                      value:
                        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                      message: "Provide a valid Email", // JS only: <p>error message</p> TS only support string
                    },
                  })}
                  type="email"
                  value={user.email || ""}
                  placeholder="Type email"
                  className="input input-bordered w-full"
                />

                <label className="label">
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                  {errors.email?.type === "pattern" && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </label>
              </div>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-minimumOrderQuantity">
                    minimumOrderQuantity
                  </span>
                </label>
                <input
                  {...register("minimumOrderQuantity")}
                  name="minimumOrderQuantity"
                  value={minimumOrderQuantity || ""}
                  type="number"
                  onChange={(e) => onInputChange(e)}
                  placeholder="Type minimumOrderQuantity"
                  className="input input-bordered w-full"
                />
              </div>

              <span className="text-red-600">
                Price : ${price * minimumOrderQuantity}
              </span>
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
                <button
                  className="btn btn-accent"
                  disabled={
                    items.minimumOrderQuantity >
                      parseInt(minimumOrderQuantity) ||
                    items.availableQuantity < parseInt(minimumOrderQuantity)
                  }
                >
                  {false ? "Loading..." : "Place the order"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* <div className="card">
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
        </div> */}
      </div>
    </div>
  );
};

export default Purchase;

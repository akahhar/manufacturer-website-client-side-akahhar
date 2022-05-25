import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const Purchase = () => {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (
      parseInt(items.minimumOrderQuantity) > parseInt(minimumOrderQuantity) ||
      parseInt(items.availableQuantity) < parseInt(minimumOrderQuantity)
    ) {
      toast.warning(
        `Minimum order : ${items.minimumOrderQuantity} and Maximum order : ${items.availableQuantity}`
      );
    }
  }, [
    items.availableQuantity,
    items.minimumOrderQuantity,
    minimumOrderQuantity,
  ]);

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
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading) {
    <Loading />;
  }
  useEffect(() => {
    // reset form with user data
    reset(item);
  }, [item, reset]);

  const onSubmit = (data) => {
    const url = `http://localhost:5000/addOrder`;

    const order = {
      userName: user.displayName,
      userEmail: user.email,
      address: data.address,
      phone: data.phoneNumber,
      name: name,
      quantity: minimumOrderQuantity,
      price: price * minimumOrderQuantity,
      image: image,
    };
    console.log(order);
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          navigate("/dashboard/myOrders");
          toast.success("Product Add Successfully");
        }
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
                  type="text"
                  disabled
                  value={user.displayName || ""}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-email">Email</span>
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email || ""}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-name">Product Name</span>
                </label>
                <input
                  type="text"
                  disabled
                  value={name || ""}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full mb-3">
                <label className="label">
                  <span className="label-minimumOrderQuantity">Quantity</span>
                </label>
                <input
                  {...register("minimumOrderQuantity", {
                    required: {
                      value: true,
                      message: "Quantity is required",
                    },
                  })}
                  name="minimumOrderQuantity"
                  value={minimumOrderQuantity || ""}
                  type="number"
                  onChange={(e) => onInputChange(e)}
                  placeholder="Type Quantity"
                  className="input input-bordered w-full"
                />
                {errors.minimumOrderQuantity?.type === "required" && (
                  <p className="text-red-500">
                    {errors.minimumOrderQuantity.message}
                  </p>
                )}
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

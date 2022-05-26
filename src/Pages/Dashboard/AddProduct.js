import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const AddProduct = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [products, setProducts] = useState({
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
  } = products;

  const onInputChange = (e) => {
    setProducts({ ...products, [e.target.name]: e.target.value });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (loading) {
    return <Loading />;
  }

  const onSubmit = (data) => {
    const url = `https://lit-brushlands-20447.herokuapp.com/addTools`;

    const pro = {
      name: data.name,
      description: data.description,
      minimumOrderQuantity: data.minimumOrderQuantity,
      availableQuantity: data.availableQuantity,
      price: data.price,
      image: data.image,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(pro),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast.success("Product save successfully");
          navigate("/dashboard/manageProducts");
        }
      })
      .catch((error) => toast.warning(error.message));
  };
  return (
    <div className="card bg-base-100  shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="font-bold mb-5">Add Product</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="form-control ">
              <label className="label">
                <span className="label-name">Product Name:</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Product Name is required",
                  },
                })}
                type="text"
                name="name"
                placeholder="Type name"
                className="input input-bordered ratting"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-description">Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                })}
                name="description"
                type="text"
                placeholder="Type Description"
                className="input input-bordered ratting"
              ></textarea>
              {errors.description?.type === "required" && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-minimumOrderQuantity">
                  Minimum Order Quantity
                </span>
              </label>
              <input
                {...register("minimumOrderQuantity", {
                  required: {
                    value: true,
                    message: "Minimum Order Quantity is required",
                  },
                })}
                name="minimumOrderQuantity"
                type="number"
                placeholder="Type Minimum Order Quantity"
                className="input input-bordered ratting"
              />
              {errors.minimumOrderQuantity?.type === "required" && (
                <p className="text-red-500">
                  {errors.minimumOrderQuantity.message}
                </p>
              )}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-availableQuantity">
                  Available Quantity
                </span>
              </label>
              <input
                {...register("availableQuantity", {
                  required: {
                    value: true,
                    message: "Available Quantity is required",
                  },
                })}
                name="availableQuantity"
                type="number"
                placeholder="Type Available Quantity"
                className="input input-bordered ratting"
              />
              {errors.availableQuantity?.type === "required" && (
                <p className="text-red-500">
                  {errors.availableQuantity.message}
                </p>
              )}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-price">Price :</span>
              </label>
              <input
                {...register("price", {
                  required: {
                    value: true,
                    message: "Price is required",
                  },
                })}
                name="price"
                type="number"
                placeholder="Type Price"
                className="input input-bordered ratting"
              />
              {errors.price?.type === "required" && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <div className="form-control ">
              <label className="label">
                <span className="label-image">Image link</span>
              </label>
              <input
                {...register("image", {
                  required: {
                    value: true,
                    message: "Image Link is required",
                  },
                })}
                name="image"
                type="text"
                placeholder="Type Image link"
                className="input input-bordered ratting"
              />
              {errors.image?.type === "required" && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
          </div>

          <div className="card-actions mt-3">
            <button className="btn btn-accent">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

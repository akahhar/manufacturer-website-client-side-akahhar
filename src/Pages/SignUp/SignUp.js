import React, { useEffect } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading";
const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [token] = useToken(gUser || user);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);

  if (gLoading || loading || updating) {
    return <Loading />;
  }
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };

  return (
    <div className="signUp flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body" id="signUp">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center">Sign Up</h2>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-name">Name</span>
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Must be 3 characters or longer", // JS only: <p>error message</p> TS only support string
                  },
                })}
                type="text"
                placeholder="Type name"
                className="input input-bordered w-full"
              />

              {errors.name?.type === "required" && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500">{errors.name.message}</p>
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-password">Password</span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer", // JS only: <p>error message</p> TS only support string
                  },
                })}
                type="password"
                placeholder="Type password"
                className="input input-bordered w-full mb-5"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-accent w-full">
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div>
            {gError && <p className="text-red-500">{gError.message}</p>}
            {error && <p className="text-red-500">{error.message}</p>}
            <span>Already to Toolero? </span>
            <span>
              <Link to="/login" className="text-secondary">
                Login
              </Link>
            </span>
          </div>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="divider">OR</div>
          </div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            SIGN UP WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    emailPassUser,
    emailPassLoading,
    emailPassError,
  ] = useSignInWithEmailAndPassword(auth);

  const [token] = useToken(emailPassUser || gUser);

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
      // navigate("/");
    }
  }, [from, navigate, token]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  if (gLoading || emailPassLoading) {
    return <Loading />;
  }
  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="login flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body" id="login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center">Login</h2>
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
                className="input input-bordered w-full"
              />

              {errors.password?.type === "required" && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <Link
                to="/passreset"
                className="label-forgot-password mb-5 text-secondary"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="card-actions justify-center">
              <button
                disabled={emailPassLoading}
                className="btn btn-accent w-full"
              >
                {emailPassLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div>
            {gError && <p className="text-red-500">{gError.message}</p>}
            {emailPassError && (
              <p className="text-red-500">{emailPassError.message}</p>
            )}
            <span>New to Toolero? </span>
            <span>
              <Link to="/signup" className="text-secondary">
                Create new account
              </Link>
            </span>
          </div>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="divider">OR</div>
          </div>

          <button
            onClick={() => signInWithGoogle()}
            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
          >
            <div className="bg-white p-2 rounded-full">
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </div>
            <span className="ml-4">SIGN IN WITH GOOGLE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

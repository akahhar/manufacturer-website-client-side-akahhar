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
      // navigate(from, { replace: true });
      navigate("/dashboard");
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
            className="btn btn-outline"
          >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

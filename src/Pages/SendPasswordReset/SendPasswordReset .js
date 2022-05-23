import { useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const SendPasswordReset = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        toast.error("USER NOT FOUND", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, 3000);
    }
  }, [error]);
  if (sending) {
    return <Loading />;
  }

  const onSubmit = async (data) => {
    await sendPasswordResetEmail(data.email);
    toast.success("Sent Email");
  };

  return (
    <div className="pass-reset flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl mx-auto">
        <div className="card-body" id="login">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center">Password Reset</h2>
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
            <div className="card-actions justify-center">
              <button className="btn btn-accent w-full">
                {0 ? "Loading..." : "Reset password"}
              </button>
            </div>
          </form>
          <div>
            {error && <p className="text-red-500">{error.message}</p>}
            <span>
              <Link to="/login" className="text-secondary btn btn-xs">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SendPasswordReset;

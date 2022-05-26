import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const RequireAuth = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  // console.log(admin);
  // const [sendEmailVerification, sending, verifyError] =
  //   useSendEmailVerification(auth);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (!user?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
  //   return (
  //     <div className="text-center py-5">
  //       <h2 className="text-accent mb-3">Your Email is not verified!!</h2>
  //       <h3 className="text-success mb-3"> Please Verify your email address</h3>
  //       <h4>Your email address : {user.email}</h4>
  //       <button
  //         className="btn btn-accent"
  //         disabled={sending}
  //         onClick={async () => {
  //           await sendEmailVerification();
  //           alert("Sent Email Verification");
  //         }}
  //       >
  //         Send Verification Email Again
  //       </button>
  //     </div>
  //   );
  // }
  return <div>{children}</div>;
};

export default RequireAuth;

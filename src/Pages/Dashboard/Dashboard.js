import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import CustomLink from "../Shared/CustomLink";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h2 className="text-3xl text-purple-500 mb-3">
          Welcome to your Dashboard
        </h2>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
          </li>
          {!admin && (
            <>
              <li>
                <CustomLink to="/dashboard/myOrders">My Orders</CustomLink>
              </li>
              <li>
                <CustomLink to="/dashboard/addReview">Add A Review</CustomLink>
              </li>
              <li>
                <CustomLink to="/dashboard/myProfile">My Orders</CustomLink>
              </li>
            </>
          )}

          {admin && (
            <>
              <li>
                <CustomLink to="/dashboard/manageAllOrders">
                  Manage All Orders
                </CustomLink>
              </li>
              <li>
                <CustomLink to="/dashboard/addProduct">
                  Add A Product
                </CustomLink>
              </li>
              <li>
                <CustomLink to="/dashboard/manageProducts">
                  Manage Products
                </CustomLink>
              </li>
              <li>
                <CustomLink to="/dashboard/makeAdmin">Make A Admin</CustomLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

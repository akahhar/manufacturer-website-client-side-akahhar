import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import logo from "../../assets/images/large_toolero -l.png";
import auth from "../../firebase.init";
import CustomLink from "./CustomLink";
const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  const menusItems = (
    <>
      <li>
        <CustomLink to="/home">Home</CustomLink>
      </li>
      {user && (
        <li>
          <CustomLink to="/dashboard">Dashboard</CustomLink>
        </li>
      )}
      <li>
        <CustomLink to="/blog">Blogs</CustomLink>
      </li>
      <li>
        <CustomLink to="/myPortfolio">My Portfolio</CustomLink>
      </li>
      <li>
        {user ? (
          <button className="btn btn-ghost" onClick={logout}>
            Log out
          </button>
        ) : (
          <CustomLink to="/login">Login</CustomLink>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 justify-between max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menusItems}
          </ul>
        </div>
        <Link to="/">
          <img className="w-32" src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menusItems}</ul>
      </div>
      <div>
        {" "}
        {user?.displayName ? (
          <div className="btn btn-xs">{user?.displayName}</div>
        ) : (
          "New User"
        )}
      </div>
      <div className="navbar-end lg:hidden">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default NavBar;

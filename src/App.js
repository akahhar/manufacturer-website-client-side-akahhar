import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProduct from "./Pages/Dashboard/AddProduct";
import AddReview from "./Pages/Dashboard/AddReview";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardMessages from "./Pages/Dashboard/DashboardMessages";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/ManageAllOrders";
import ManageProducts from "./Pages/Dashboard/ManageProducts";
import MyOrders from "./Pages/Dashboard/MyOrders";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NewAuth from "./Pages/Login/NewAuth";
import RequireAuth from "./Pages/Login/RequireAuth";
import UserAuth from "./Pages/Login/UserAuth";
import Purchase from "./Pages/Purchase/Purchase";
import SendPasswordReset from "./Pages/SendPasswordReset/SendPasswordReset ";
import NavBar from "./Pages/Shared/NavBar";
import SignUp from "./Pages/SignUp/SignUp";
function App() {
  return (
    <div className="px-5">
      {/* max-w-7xl mx-auto */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>

        <Route
          path="/purchase/:itemId"
          element={
            <RequireAuth>
              <Purchase></Purchase>
            </RequireAuth>
          }
        ></Route>

        {/* <Route
          path="/appointment"
          element={
            <RequireAuth>
              <Appointment></Appointment>
            </RequireAuth>
          }
        ></Route> */}

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<DashboardMessages />}></Route>
          <Route
            path="/dashboard/myOrders"
            element={
              <NewAuth>
                <MyOrders />
              </NewAuth>
            }
          ></Route>
          <Route
            path="/dashboard/addReview"
            element={
              <NewAuth>
                <AddReview />
              </NewAuth>
            }
          ></Route>
          <Route path="/dashboard/myProfile" element={<MyProfile />}></Route>
          <Route
            path="/dashboard/manageAllOrders"
            element={
              <UserAuth>
                <ManageAllOrders />
              </UserAuth>
            }
          ></Route>
          <Route
            path="/dashboard/addProduct"
            element={
              <UserAuth>
                <AddProduct />
              </UserAuth>
            }
          ></Route>
          <Route
            path="/dashboard/makeAdmin"
            element={
              <UserAuth>
                <MakeAdmin />
              </UserAuth>
            }
          ></Route>
          <Route
            path="/dashboard/manageProducts"
            element={
              <UserAuth>
                <ManageProducts />
              </UserAuth>
            }
          ></Route>
        </Route>
        {/* <Route path="/about" element={<About />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/passreset" element={<SendPasswordReset />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

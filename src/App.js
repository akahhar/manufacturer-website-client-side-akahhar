import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Blog from "./Pages/Blogs/Blog";
import AddProduct from "./Pages/Dashboard/AddProduct";
import AddReview from "./Pages/Dashboard/AddReview";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardMessages from "./Pages/Dashboard/DashboardMessages";
import MakeAdmin from "./Pages/Dashboard/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/ManageAllOrders";
import ManageProducts from "./Pages/Dashboard/ManageProducts";
import MyOrders from "./Pages/Dashboard/MyOrders";
import MyProfile from "./Pages/Dashboard/MyProfile";
import Payment from "./Pages/Dashboard/Payment";
import Home from "./Pages/Home/Home";
import AdminAuth from "./Pages/Login/AdminAuth";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Pages/Login/RequireAuth";
import UserAuth from "./Pages/Login/UserAuth";
import MyPortfolio from "./Pages/MyPortfolio/MyPortfolio";
import NotFound from "./Pages/NotFound/NotFound";
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
              <UserAuth>
                <MyOrders />
              </UserAuth>
            }
          ></Route>
          <Route
            path="/dashboard/addReview"
            element={
              <UserAuth>
                <AddReview />
              </UserAuth>
            }
          ></Route>
          <Route path="/dashboard/payment/:id" element={<Payment />}></Route>
          <Route path="/dashboard/myProfile" element={<MyProfile />}></Route>
          <Route
            path="/dashboard/manageAllOrders"
            element={
              <AdminAuth>
                <ManageAllOrders />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/dashboard/addProduct"
            element={
              <AdminAuth>
                <AddProduct />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/dashboard/makeAdmin"
            element={
              <AdminAuth>
                <MakeAdmin />
              </AdminAuth>
            }
          ></Route>
          <Route
            path="/dashboard/manageProducts"
            element={
              <AdminAuth>
                <ManageProducts />
              </AdminAuth>
            }
          ></Route>
        </Route>
        {/* <Route path="/about" element={<About />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/myPortfolio" element={<MyPortfolio />}></Route>
        <Route path="/passreset" element={<SendPasswordReset />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

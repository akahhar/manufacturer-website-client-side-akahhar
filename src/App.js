import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import RequireAuth from "./Pages/Login/RequireAuth";
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
            path="/dashboard/appointments"
            element={<Appointments />}
          ></Route>
          <Route path="/dashboard/reviews" element={<MyReviews />}></Route>
          <Route
            path="/dashboard/users"
            element={
              <UserAuth>
                <Users></Users>
              </UserAuth>
            }
          ></Route>
        </Route>
        <Route path="/about" element={<About />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/passreset" element={<SendPasswordReset />}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

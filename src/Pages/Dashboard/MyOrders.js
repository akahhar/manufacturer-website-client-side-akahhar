import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const MyOrders = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/orders?email=${user.email}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/");
          }
          return res.json();
        })
        .then((data) => {
          setOrders(data);
        });
    }
  }, [navigate, user]);
  console.log(orders);
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* <!-- head --> */}
        <thead>
          <tr>
            <th>Sr.N</th>
            <th>User Name</th>
            <th>Email Address</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- row 1 --> */}
          {orders?.map((order, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{order.userName}</td>
              <td>{order.userEmail}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>{order.quantity}</td>
              <td>${order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;

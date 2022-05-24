import React from "react";
import useProducts from "../../hooks/useProducts";

const ManageProducts = () => {
  const [tools] = useProducts();
  console.log(tools);
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
          {/* {orders?.map((order, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{order.userName}</td>
              <td>{order.userEmail}</td>
              <td>{order.address}</td>
              <td>{order.phone}</td>
              <td>{order.quantity}</td>
              <td>${order.price}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;

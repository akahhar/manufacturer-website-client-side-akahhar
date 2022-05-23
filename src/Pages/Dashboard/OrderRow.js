import React from "react";

const OrderRow = ({ user, index }) => {
  const { email, role } = user;

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{email}</td>
      <td>
        <button className="btn btn-xs">Remove Order</button>
      </td>
    </tr>
  );
};

export default OrderRow;

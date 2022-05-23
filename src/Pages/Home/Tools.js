import React, { useEffect, useState } from "react";
import Tool from "./Tool";

const Tools = () => {
  const [tools, setTools] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/tools`)
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="text-xl text-center font-bold mb-10 section-header">
        <h3>Our Top Selling Products</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tools.map((tool, index) => (
          <Tool key={index} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default Tools;

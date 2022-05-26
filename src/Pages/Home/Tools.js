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
      <div className="flex flex-col text-center w-full mb-20">
        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
          Our Products
        </h2>
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
          Products designed to help you work
        </h1>
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

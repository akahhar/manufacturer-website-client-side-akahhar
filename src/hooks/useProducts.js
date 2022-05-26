import { useEffect, useState } from "react";

const useProducts = () => {
  const [tools, setTools] = useState([]);
  useEffect(() => {
    fetch(`https://lit-brushlands-20447.herokuapp.com/tools`)
      .then((res) => res.json())
      .then((data) => setTools(data));
  }, []);

  return [tools];
};

export default useProducts;

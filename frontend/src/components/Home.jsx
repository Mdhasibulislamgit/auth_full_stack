import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../utils/toast";

const Home = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    setLoggedInUser(storedUser);
  }, []);

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error("Error in fetchProducts:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    showSuccessToast("User Logout Successfully");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">{loggedInUser}</h1>
      <button
        onClick={handleLogout}
        className="rounded-xl border border-black bg-slate-400 px-5 py-2 text-black transition duration-300 hover:bg-slate-500"
      >
        Log Out
      </button>
      <div className="mt-4">
        {products.map((item, index) => (
          <ul key={index} className="mb-2">
            <li>
              <span>
                {item.name}: {item.Price}
              </span>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Home;

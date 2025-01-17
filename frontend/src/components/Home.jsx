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
      const url = "https://auth-full-stack-15-1-2025.vercel.app/products";
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">{loggedInUser}</h1>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Log Out
        </button>
        <div className="mt-6">
          {products.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4 shadow-md">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">Price: {item.Price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
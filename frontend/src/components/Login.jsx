import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Login = () => {
  const navigate = useNavigate();
  
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return showErrorToast("Please fill in all fields"); // Show error toast
    }

    try {
      const url = "https://auth-full-stack-15-1-2025.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, massage, error, jwtToken,  } = result;
      if (success) {
        showSuccessToast(massage);
        
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", result.data.name); // Save the user's name to local storage
       
        console.log(
          "localStorage loggedInUser:",
          localStorage.getItem("loggedInUser")
        );

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error.details[0].message;
        showErrorToast(details);
      } else if (!success) {
        showErrorToast(massage);
      }
      console.log("come form result:", result);
    } catch (err) {
      showErrorToast(err.massage);
    }

    console.log("Login Info:", loginInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-center text-2xl font-medium">Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-xl block mb-2">
              Email:
            </label>
            <input
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              type="text"
              name="email"
              placeholder="Enter Your Email"
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-xl block mb-2">
              Password:
            </label>
            <input
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              type="password"
              name="password"
              placeholder="Enter Your Password"
              value={loginInfo.password}
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-7 py-2 rounded-md block bg-teal-500 text-white ml-auto"
          >
            Login
          </button>
          <div className="text-center text-sm mt-4">
            <span>Do not have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

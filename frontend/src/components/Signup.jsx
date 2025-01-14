import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Signup = () => {

const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return showErrorToast("Please fill in all fields"); // Show error toast
    }

    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, massage, error } = result;
      if (success) {
        showSuccessToast(massage);
        setTimeout(() => {
          navigate("/login")
        },1000)
      } else if (error) {
        const details = error.details[0].message;
        showErrorToast(details);
      } else if (!success) {
        showErrorToast(massage);
      }

      console.log(result);
    } catch (err) {
      showErrorToast(err.massage);
    }

    console.log("Signup Info:", signupInfo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-center text-2xl font-medium">Signup</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="text-xl block mb-2">
              Name:
            </label>
            <input
              onChange={handleChange}
              className="w-full p-2 border border-gray-400 rounded"
              type="text"
              name="name"
              autoFocus
              placeholder="Enter Your Name"
              value={signupInfo.name}
            />
          </div>
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
              value={signupInfo.email}
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
              value={signupInfo.password}
            />
          </div>
          <button
            type="submit"
            className="mt-3 px-7 py-2 rounded-md block bg-teal-500 text-white ml-auto"
          >
            Signup
          </button>
          <div className="text-center text-sm mt-4">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

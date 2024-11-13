import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import thunder from "../assets/thunder.png"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/userLogin",
        {
          email: user.email,
          password: user.password,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);

        // Save token to local storage (or another secure method)
        localStorage.setItem("token", response.data.token);

        // Redirect to dashboard or another protected route
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="flex flex-col items-center rounded-lg border-2 w-[25rem] h-[35rem] p-6 bg-white shadow-lg">
        <div className="flex flex-col items-center mt-10">
          <div>
            <img src={thunder} alt="Logo" className="h-[5rem]" />
          </div>
          <div className="text-center mt-4">
            <h1 className="text-black text-xl font-sans">Hey Buddy</h1>
            <span className="text-black text-2xl font-serif">
              Welcome To Thunderest
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 w-[20rem] p-6"
        >
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer top-[1.7rem] text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f14444] text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <p>
            Not on Thunderest yet?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

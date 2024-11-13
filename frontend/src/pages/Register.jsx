import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import thunder from "../assets/thunder.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for password visibility

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
        "http://localhost:5000/api/user/register",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        }
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        setUser({ name: "", email: "", password: "" }); // Clear form
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while registering.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <Toaster />
      <div className="flex flex-col items-center rounded-lg border-2 w-[25rem] h-[36.6rem] p-6 bg-white shadow-lg">
        <div className="flex flex-col items-center">
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
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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
              type={showPassword ? "text" : "password"}
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
            Register
          </button>
        </form>

        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

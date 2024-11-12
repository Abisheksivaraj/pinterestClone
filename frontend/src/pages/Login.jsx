import React, { useState } from "react";
import thunder from "../assets/thunder.png";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loginUser , btnLoading}= UserData();

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password,navigate);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
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
          onSubmit={submitHandler}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
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

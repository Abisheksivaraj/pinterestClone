import React, { useState } from "react";
import thunder from "../assets/thunder.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center rounded-lg justify-start border-2 w-[25rem] h-[35rem]">
        <div className="flex flex-col items-center mt-10">
          <div>
            <img src={thunder} alt="" className="h-[5rem]" />
          </div>
          <div className="text-center">
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

        <div>
          <p>
            Not on Thunderest yet? <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

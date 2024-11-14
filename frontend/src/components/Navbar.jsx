import React from "react";
import { Link } from "react-router-dom";
import thunder from "../assets/thunder.png";

const Navbar = ({ user }) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center gap-2">
          <img src={thunder} alt="Pinterest Logo" className="h-10 w-10" />
          <span className="text-[#FF5349] text-xl font-serif font-bold">
            Thunderest
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition">
            Home
          </Link>
          <Link
            to="/create"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Create
          </Link>
          <Link
            to="/like"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Like
          </Link>
          <Link
            to="/tags"
            className="text-gray-700 hover:text-gray-900 transition"
          >
            Tags
          </Link>

          <Link
            to="/account"
            className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-700 hover:bg-gray-400 transition"
          >
            {user.name.slice(0, 1)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

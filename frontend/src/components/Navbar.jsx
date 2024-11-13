import React from "react";
import thunder from "../assets/thunder.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white text-white shadow-lg border-2 border-gray-200">
      {/* Logo and Logoname */}
      <div className="flex items-center">
        <img src={thunder} alt="Logo" className="h-8 w-8 mr-2" />{" "}
        <span className="font-bold text-lg text-[red]">Thunderest</span>{" "}
      </div>

      {/* Menu Items */}
      <div className="flex space-x-10 font-medium text-[#ea6b6b] mr-20">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/create" className="hover:underline">
          Create
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

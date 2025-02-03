import React from "react";
import { Link } from "react-router-dom";
import { HiHome } from "react-icons/hi"; // Importing the Home icon from react-icons

const Breadcrumbs = () => {
  return (
    <div className="flex items-center space-x-3 text-gray-700 mb-6">
      <Link
        to="/"
        className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 font-semibold"
      >
        <HiHome className="text-xl" /> {/* Home Icon */}
        <span>Home</span>
      </Link>
      <span className="text-gray-500">/</span>
      <Link
        to="/products"
        className="text-blue-500 hover:text-blue-700 font-semibold"
      >
        Products
      </Link>
      <span className="text-gray-500">/</span>
      <span className="text-gray-500 font-semibold">Cart</span>
    </div>
  );
};

export default Breadcrumbs;

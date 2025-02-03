import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex items-center space-x-3 text-gray-700 mb-6">
      <Link to="/" className="flex items-center space-x-1 text-blue-500 hover:text-blue-700 font-semibold">
        <HiHome className="text-xl" />
        <span>Home</span>
      </Link>
      {pathnames.map((value, index) => (
        <span key={index} className="text-gray-500"> / {decodeURIComponent(value)}</span>
      ))}
    </div>
  );
};

export default Breadcrumbs;

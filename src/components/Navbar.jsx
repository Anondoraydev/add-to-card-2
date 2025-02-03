import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl">My Store</div>
        <div className="relative">
          <Link to="/cart">
            <button className="bg-blue-700 px-4 py-2 rounded-full">
              Cart
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2">
                  {cartCount}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

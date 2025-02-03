import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = ({ cartCount, searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl">My Store</div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-md border-2 border-gray-300 text-black outline-none"
          />
        </div>

        {/* Cart */}
        <div className="relative">
          <Link to="/cart">
            <button className="bg-blue-700 px-4 py-2 rounded-full">
              <FiShoppingCart className="text-2xl" />
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

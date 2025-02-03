import React, { useState } from "react";

const Cart = ({ cart }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCart = cart.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredCart.length === 0) {
    return (
      <div className="mt-4 p-6 border rounded bg-white shadow-md">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="mt-4 p-6 border rounded bg-white shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={() => window.location.reload()}
        >
          Close Cart
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ul>
        {filteredCart.map((product, index) => (
          <li key={index} className="mb-4 flex justify-between">
            <div>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
            </div>
            <div>
              <p>${product.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-lg font-bold">
        Total: ${filteredCart.reduce((total, product) => total + product.price, 0)}
      </div>
    </div>
  );
};

export default Cart;

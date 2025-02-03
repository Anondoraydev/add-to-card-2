import React from "react";
import { FiTrash2 } from "react-icons/fi"; // Trash icon to delete items

const CartPage = ({ cart, setCart }) => {
  // Function to remove item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Function to clear the entire cart
  const handleClearCart = () => {
    setCart([]);
  };

  if (cart.length === 0) {
    return (
      <div className="mt-4 p-6 border rounded bg-white shadow-md text-center">
        <p className="text-lg font-semibold">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-6 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {/* Clear Cart Button */}
      <button
        className="bg-red-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleClearCart}
      >
        Clear Cart
      </button>

      <ul>
        {cart.map((product, index) => (
          <li key={index} className="mb-4 flex items-center justify-between border-b pb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <strong>{product.title}</strong>
              <p className="text-gray-600">${product.price}</p>
            </div>
            {/* Trash icon to remove product */}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleRemoveFromCart(index)}
            >
              <FiTrash2 className="text-2xl" />
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-lg font-bold">
        Total: ${cart.reduce((total, product) => total + product.price, 0)}
      </div>
    </div>
  );
};

export default CartPage;

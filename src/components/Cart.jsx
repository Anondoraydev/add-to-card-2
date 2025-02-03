import React from "react";

const Cart = ({ cart }) => {
  if (cart.length === 0) {
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
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => window.location.reload()}>
          Close Cart
        </button>
      </div>
      <ul>
        {cart.map((product, index) => (
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
        Total: ${cart.reduce((total, product) => total + product.price, 0)}
      </div>
    </div>
  );
};

export default Cart;

import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs"; // Importing Breadcrumbs

const CartPage = ({ cart }) => {
  if (cart.length === 0) {
    return (
      <div className="mt-4 p-6 border rounded bg-white shadow-md">
        <Breadcrumbs />
        <h2 className="text-xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/" className="text-blue-500">
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 p-6 border rounded bg-white shadow-md">
      <Breadcrumbs />
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.title}</td>
                <td className="p-4">${product.price}</td>
                <td className="p-4">
                  <input
                    type="number"
                    defaultValue={1}
                    className="w-12 p-2 border rounded"
                  />
                </td>
                <td className="p-4">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="font-bold text-lg">
          Total: ${cart.reduce((total, product) => total + product.price, 0)}
        </div>
        <div>
          <Link to="/" className="px-6 py-2 bg-blue-500 text-white rounded">
            Continue Shopping
          </Link>
          <button
            className="ml-4 px-6 py-2 bg-green-500 text-white rounded"
            // Implement checkout functionality here
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

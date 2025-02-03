import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover"
      />
      <h3 className="text-lg font-bold">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          View Details
        </Link>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;

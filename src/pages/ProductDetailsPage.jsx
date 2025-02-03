import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details!", error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <img src={product.image} alt={product.title} className="w-64 mx-auto" />
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductDetailsPage;

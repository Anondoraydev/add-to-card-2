import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetailsPage from "./pages/ProductDetailsPage"; // Import ProductDetailsPage
import CartPage from "./pages/CartPage";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") // Fetch products list
      .then((response) => {
        setProducts(response.data); // Set the products data
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="font-sans text-gray-900">
      <Navbar cartCount={cart.length} />
      <div className="container mx-auto p-4">
        <Breadcrumbs />
        <Routes>
          <Route
            path="/"
            element={
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  products.map((product) => (
                    <Product
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))
                )}
              </div>
            }
          />
          <Route path="/cart" element={<CartPage cart={cart} />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} /> {/* Product Details Route */}
        </Routes>
      </div>
    </div>
  );
};

export default App;

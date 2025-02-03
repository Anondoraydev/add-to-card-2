import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetailsPage from "./pages/ProductDetailsPage"; // Product Details Page
import CartPage from "./pages/CartPage"; // Cart Page
import Breadcrumbs from "./components/Breadcrumbs"; // Breadcrumbs

const App = () => {
  const [cart, setCart] = useState([]); // Cart state to store added products
  const [products, setProducts] = useState([]); // Products state to store products fetched from the API
  const [loading, setLoading] = useState(true); // Loading state to show loading indicator

  useEffect(() => {
    // Fetch products from an API
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data); // Set products data
        setLoading(false); // Set loading state to false once products are loaded
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); // Add product to cart
  };

  return (
    <div className="font-sans text-gray-900">
      <Navbar cartCount={cart.length} /> {/* Display Cart Count in Navbar */}
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
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="font-sans text-gray-900">
      <Navbar cartCount={cart.length} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto p-4">
        <Breadcrumbs />
        <Routes>
          <Route
            path="/"
            element={
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {loading ? (
                  <div>Loading...</div>
                ) : filteredProducts.length === 0 ? (
                  <div>No products found</div>
                ) : (
                  filteredProducts.map((product) => (
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
          <Route path="/product/:productId" element={<ProductDetailsPage onAddToCart={handleAddToCart} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Product from "./components/Product";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import Breadcrumbs from "./components/Breadcrumbs";
import Popup from "./components/Popup"; // Import Popup component

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for the popup message

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

    // Show popup with the product name
    setPopupMessage(`${product.title} has been added to your cart!`);
    setShowPopup(true);

    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

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
                  <span className="loading loading-spinner text-warning top-1/2 left-1/2 absolute w-9"></span>
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

      {/* Show Popup if showPopup is true */}
      {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default App;

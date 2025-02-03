import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaShoppingCart, FaTrash } from "react-icons/fa";

const ProductDetailsPage = ({ onAddToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
    setReviews([
      { user: "John Doe", comment: "Great product!", rating: 5 },
      { user: "Jane Smith", comment: "Good value for money.", rating: 4 },
    ]);
  }, [productId]);

  const handleAddReview = () => {
    if (newReview.trim()) {
      setReviews([...reviews, { user: "Anonymous", comment: newReview, rating }]);
      setNewReview("");
      setRating(0);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-3xl font-bold text-gray-800">{product.title}</h2>
                <p className="text-lg text-gray-600 mt-2">{product.description}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-4">${product.price}</p>
                <button
                  onClick={handleAddToCartClick}
                  className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full flex items-center shadow-md hover:bg-blue-600 transition"
                >
                  <FaShoppingCart className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="w-full md:w-1/2 md:ml-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800">Customer Reviews</h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="mt-4 border-b pb-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{review.user}</p>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <FaStar key={starIndex} className={starIndex < review.rating ? "text-yellow-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                    </div>
                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => setReviews(reviews.filter((_, i) => i !== index))} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-4">No reviews yet.</p>
              )}

              <div className="mt-6">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review..."
                  className="w-full p-4 border rounded-lg shadow-md mt-4"
                ></textarea>
                <div className="flex items-center mt-4">
                  <p className="mr-2">Your Rating:</p>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < rating ? "text-yellow-400 cursor-pointer" : "text-gray-300 cursor-pointer"}
                        onClick={() => setRating(index + 1)}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={handleAddReview}
                  className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

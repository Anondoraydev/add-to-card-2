import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // For the rating stars

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1); // For quantity selection
  const [cart, setCart] = useState([]);
  const [reviews, setReviews] = useState([]); // Store reviews in state
  const [reviewText, setReviewText] = useState(""); // Review input
  const [reviewRating, setReviewRating] = useState(0); // Review rating

  useEffect(() => {
    // Fetch product details by productId
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setReviews(response.data.reviews || []); // Set reviews (if any)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [productId]);

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    setCart((prevCart) => [...prevCart, productWithQuantity]);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() && reviewRating > 0) {
      const newReview = {
        name: "Anonymous", // In a real app, this would be the user's name
        rating: reviewRating,
        comment: reviewText,
      };
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setReviewText(""); // Clear the input field
      setReviewRating(0); // Reset the rating
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Back to Products
        </Link>
      </div>
      <div className="flex flex-col md:flex-row bg-white p-6 border rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-cover mb-4 md:mb-0"
        />
        <div className="md:ml-6">
          <p className="text-xl font-semibold text-gray-900">${product.price}</p>
          <div className="flex items-center my-4">
            {/* Rating stars */}
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`${
                  product.rating.rate > index ? "text-yellow-400" : "text-gray-300"
                } text-lg`}
              />
            ))}
            <span className="ml-2 text-gray-500">({product.rating.count} reviews)</span>
          </div>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 text-lg font-semibold">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border rounded text-center"
            />
          </div>
          <div>
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>

        {/* Display Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      review.rating > index ? "text-yellow-400" : "text-gray-300"
                    } text-sm`}
                  />
                ))}
                <span className="ml-2 text-gray-500">by {review.name}</span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}

        {/* Review Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Leave a Review</h3>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="flex items-center">
              <span className="mr-4">Rating:</span>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    reviewRating > index ? "text-yellow-400" : "text-gray-300"
                  } cursor-pointer text-xl`}
                  onClick={() => setReviewRating(index + 1)}
                />
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border rounded"
              rows="4"
            />
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

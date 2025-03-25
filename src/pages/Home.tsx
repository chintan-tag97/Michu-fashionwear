import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-rose-900 text-white">
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt="Fashion Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-serif font-bold mb-6">
              Discover Your Style
            </h1>
            <p className="text-xl mb-8">
              Explore our latest collection of trendy fashion items for every occasion.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 bg-white text-rose-900 rounded-full font-medium hover:bg-rose-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

 

      {/* Featured Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-rose-800 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Featured products will be added here */}
        </div>
      </div>

      <div className="bg-rose-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-rose-800 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-rose-600 mb-8">
            Get the latest updates on new products and upcoming sales.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full border border-rose-200 focus:outline-none focus:border-rose-400"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-rose-900 text-white rounded-full hover:bg-rose-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home; 
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import F1 from './homeHelper/F1';
import F2 from './homeHelper/F2';
import InvestmentPackages from './homeHelper/InvestmentPage';
import F3 from './homeHelper/F3';

const Home = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const registeredUsers = 12500; // Example number, replace with real data if available

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-100 to-blue-100 py-20 pt-34 flex items-center justify-center lg:pt-48">
        <div className="max-w-5xl px-6 sm:px-10 lg:px-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-6 tracking-tight">
            Welcome to <span className="text-indigo-600">Dream Pay</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto mb-8">
            Take control of your finances with our cutting-edge platform. Earn through referrals and smart investments, all in one place.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Join Now'}
          </Link>
        </div>
      </section>

      {/* Plans Section */}
      <div className="py-12 ">
        <InvestmentPackages />
      </div>

      {/* Features Sections */}
      <F1 />
      <F2 />

      {/* Registered Users Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-100 to-purple-100 text-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Growing Community</h2>
          <p className="text-3xl md:text-4xl font-extrabold">
            {registeredUsers.toLocaleString()} Members Registered
          </p>
          <p className="text-lg mt-4">
            Be part of a thriving network of investors and earners worldwide.
          </p>
        </div>
      </section>

      <F3 />

      {/* Footer Call-to-Action */}
      <section className="py-12 bg-gray-200 text-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-lg mb-6">
            Join thousands of members who are building their wealth with Dream Pay.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/register'}
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            {isAuthenticated ? 'Go to Dashboard' : 'Join Now'}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
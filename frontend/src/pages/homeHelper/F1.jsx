import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const F1 = () => {
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

       return (
              <section className="py-16 bg-gray-50">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
                                   Choose the Perfect Plan for Your Success Journey
                            </h2>
                            <p className="text-center text-lg text-gray-600 mb-12">
                                   Start earning with our tailored investment plans.
                            </p>
                            <div className="flex flex-col items-center justify-center md:flex-row gap-8">
                                   {/* Basic Plan */}
                                   <div className="bg-white p-6 rounded-xl shadow-md border border-blue-200 hover:shadow-lg transition-shadow duration-300 w-full max-w-[280px]">
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Basic Plan</h3>
                                          <p className="text-3xl font-bold text-blue-600 mb-3 text-center">₹1,000</p>
                                          <p className="text-sm text-gray-500 mb-4 text-center">One Time Investment</p>
                                          <ul className="text-gray-600 mb-6 space-y-2">
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Daily Income: ₹20
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Contract Duration: 200 Days
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Total Return: ₹4,000
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Direct Income: 10%
                                                 </li>
                                          </ul>
                                          <Link
                                                 to={isAuthenticated ? '/dashboard' : '/register'}
                                                 className="block text-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                          >
                                                 Get Started
                                          </Link>
                                   </div>

                                   {/* Standard Plan (Most Popular) */}
                                   <div className="relative bg-white p-6 rounded-xl shadow-md border border-purple-200 hover:shadow-lg transition-shadow duration-300 w-full max-w-[280px]">
                                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                 <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                        Most Popular
                                                 </span>
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Standard Plan</h3>
                                          <p className="text-3xl font-bold text-purple-600 mb-3 text-center">₹5,000</p>
                                          <p className="text-sm text-gray-500 mb-4 text-center">One Time Investment</p>
                                          <ul className="text-gray-600 mb-6 space-y-2">
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Daily Income: ₹100
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Contract Duration: 200 Days
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Total Return: ₹20,000
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Direct Income: 10%
                                                 </li>
                                          </ul>
                                          <Link
                                                 to={isAuthenticated ? '/dashboard' : '/register'}
                                                 className="block text-center bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                                          >
                                                 Get Started
                                          </Link>
                                   </div>

                                   {/* Premium Plan */}
                                   <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-200 hover:shadow-lg transition-shadow duration-300 w-full max-w-[280px] hidden lg:block">
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Premium Plan</h3>
                                          <p className="text-3xl font-bold text-yellow-600 mb-3 text-center">₹10,000</p>
                                          <p className="text-sm text-gray-500 mb-4 text-center">One Time Investment</p>
                                          <ul className="text-gray-600 mb-6 space-y-2">
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Daily Income: ₹200
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Contract Duration: 200 Days
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Total Return: ₹40,000
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Direct Income: 10%
                                                 </li>
                                          </ul>
                                          <Link
                                                 to={isAuthenticated ? '/dashboard' : '/register'}
                                                 className="block text-center bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                          >
                                                 Get Started
                                          </Link>
                                   </div>

                                   {/* Premium Plan (Mobile View) */}
                                   <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-200 hover:shadow-lg transition-shadow duration-300 w-full max-w-[280px] lg:hidden">
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Premium Plan</h3>
                                          <p className="text-3xl font-bold text-yellow-600 mb-3 text-center">₹10,000</p>
                                          <p className="text-sm text-gray-500 mb-4 text-center">One Time Investment</p>
                                          <ul className="text-gray-600 mb-6 space-y-2">
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Daily Income: ₹200
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Contract Duration: 200 Days
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Total Return: ₹40,000
                                                 </li>
                                                 <li className="flex items-center">
                                                        <svg
                                                               className="w-5 h-5 text-green-500 mr-2"
                                                               fill="none"
                                                               stroke="currentColor"
                                                               viewBox="0 0 24 24"
                                                        >
                                                               <path
                                                                      strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M5 13l4 4L19 7"
                                                               />
                                                        </svg>
                                                        Direct Income: 10%
                                                 </li>
                                          </ul>
                                          <Link
                                                 to={isAuthenticated ? '/dashboard' : '/register'}
                                                 className="block text-center bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                          >
                                                 Get Started
                                          </Link>
                                   </div>
                            </div>
                     </div>
              </section>
       );
};

export default F1;
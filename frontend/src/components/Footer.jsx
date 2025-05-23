import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
       return (
              <footer className="bg-gray-800 text-gray-300 py-6">
                     <div
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8"
                            // 
                     >
                            {/* Company Info */}
                            <div  data-aos-delay="100">
                                   <h3 className="text-xl font-semibold mb-4 text-yellow-400">Dream Pay</h3>
                                   <p className="text-gray-400 text-sm leading-relaxed">
                                          Empowering wealth creation through innovative MLM solutions. Join our community and start earning today.
                                   </p>
                            </div>

                            {/* Quick Links */}
                            <div  data-aos-delay="200">
                                   <h3 className="text-xl font-semibold mb-4 text-yellow-400">Quick Links</h3>
                                   <ul className="space-y-2 text-sm">
                                          <li>
                                                 <Link
                                                        to="/"
                                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                                 >
                                                        Home
                                                 </Link>
                                          </li>
                                          <li>
                                                 <Link
                                                        to="/about"
                                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                                 >
                                                        About Us
                                                 </Link>
                                          </li>
                                          <li>
                                                 <Link
                                                        to="/dashboard"
                                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                                 >
                                                        Dashboard
                                                 </Link>
                                          </li>
                                          <li>
                                                 <Link
                                                        to="/register"
                                                        className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                                 >
                                                        Join Now
                                                 </Link>
                                          </li>
                                   </ul>
                            </div>

                            {/* Contact Info */}
                            <div  data-aos-delay="300">
                                   <h3 className="text-xl font-semibold mb-4 text-yellow-400">Contact Us</h3>
                                   <ul className="space-y-2 text-sm text-gray-400">
                                          <li>
                                                 Email:{' '}
                                                 <a
                                                        href="mailto:support@dreampay.com"
                                                        className="hover:text-indigo-400 transition-colors duration-300"
                                                 >
                                                        support@dreampay.com
                                                 </a>
                                          </li>
                                          <li>
                                                 Phone:{' '}
                                                 <a
                                                        href="tel:+1234567890"
                                                        className="hover:text-indigo-400 transition-colors duration-300"
                                                 >
                                                        +1 (234) 567-890
                                                 </a>
                                          </li>
                                          <li>Address: 123 Dream St, Prosperity City, USA</li>
                                   </ul>
                            </div>

                            {/* Social Media / Newsletter */}
                            <div  data-aos-delay="400">
                                   <h3 className="text-xl font-semibold mb-4 text-yellow-400">Stay Connected</h3>
                                   <div className="flex space-x-4 mb-4">
                                          <a
                                                 href="https://facebook.com"
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                          >
                                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                                 </svg>
                                          </a>
                                          <a
                                                 href="https://twitter.com"
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                          >
                                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                                 </svg>
                                          </a>
                                          <a
                                                 href="https://linkedin.com"
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                                          >
                                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                                 </svg>
                                          </a>
                                   </div>
                                   <p className="text-gray-400 text-sm mb-2">Subscribe to our newsletter:</p>
                                   <div className="space-y-2">
                                          <input
                                                 type="email"
                                                 placeholder="Enter your email"
                                                 className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 
              focus:ring-indigo-400 focus:border-indigo-400 focus:outline-none"
                                          />
                                          <button
                                                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 
              transition-colors duration-300 focus:outline-none focus:ring-2 
              focus:ring-indigo-400 focus:ring-offset-2 shadow-md"
                                          >
                                                 Subscribe
                                          </button>
                                   </div>
                            </div>
                     </div>

                     {/* Copyright */}
                     <div
                            className="mt-8 border-t border-gray-600 pt-4 text-center text-gray-500 text-sm"
                            
                            data-aos-delay="500"
                     >
                            <p>© {new Date().getFullYear()} Dream Pay. All rights reserved.</p>
                     </div>
              </footer>
       );
};

export default Footer;
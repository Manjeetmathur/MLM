import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
       return (
              <footer className="bg-blue-200 text-gray-700 py-12">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Company Info */}
                            <div>
                                   <h3 className="text-xl font-semibold mb-4 text-indigo-600">Dream Pay</h3>
                                   <p className="text-gray-600 text-sm leading-relaxed">
                                          Empowering wealth creation through innovative MLM solutions. Join our community and start earning today.
                                   </p>
                            </div>

                            {/* Quick Links */}
                            <div>
                                   <h3 className="text-xl font-semibold mb-4 text-indigo-600">Quick Links</h3>
                                   <ul className="space-y-2 text-sm">
                                          <li>
                                                 <Link
                                                        to="/"
                                                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                                                 >
                                                        Home
                                                 </Link>
                                          </li>
                                          <li>
                                                 <Link
                                                        to="/about"
                                                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                                                 >
                                                        About Us
                                                 </Link>
                                          </li>
                                          <li>
                                                 <Link
                                                        to="/dashboard"
                                                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                                                 >
                                                        Dashboard
                                                 </Link>
                                          </li>
                                          <li>
                                                 <Link
                                                        to="/register"
                                                        className="text-gray-600 hover:text-indigo-600 transition-colors duration-300"
                                                 >
                                                        Join Now
                                                 </Link>
                                          </li>
                                   </ul>
                            </div>

                            {/* Contact Info */}
                            <div>
                                   <h3 className="text-xl font-semibold mb-4 text-indigo-600">Contact Us</h3>
                                   <ul className="space-y-2 text-sm text-gray-600">
                                          <li>
                                                 Email:{' '}
                                                 <a
                                                        href="mailto:support@dreampay.com"
                                                        className="hover:text-indigo-600 transition-colors duration-300"
                                                 >
                                                        support@dreampay.com
                                                 </a>
                                          </li>
                                          <li>
                                                 Phone:{' '}
                                                 <a
                                                        href="tel:+1234567890"
                                                        className="hover:text-indigo-600 transition-colors duration-300"
                                                 >
                                                        +1 (234) 567-890
                                                 </a>
                                          </li>
                                          <li>Address: 123 Dream St, Prosperity City, USA</li>
                                   </ul>
                            </div>

                            {/* Social Media / Newsletter */}
                            <div>
                                   <h3 className="text-xl font-semibold mb-4 text-indigo-600">Stay Connected</h3>
                                   <div className="flex space-x-4 mb-4">
                                          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                                 </svg>
                                          </a>
                                          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                                 </svg>
                                          </a>
                                          <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
                                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 3.6 8.04 8.16 9.36v-6.6H7.56v-2.76h2.64V9.72c0-2.64 1.56-4.08 3.96-4.08 1.14 0 2.34.12 2.34.12v2.52h-1.32c-1.32 0-1.56.6-1.56 1.56v1.92h2.76l-.36 2.76h-2.4v6.6c4.56-1.32 8.16-4.96 8.16-9.36 0-5.5-4.46-9.96-9.96-9.96z" />
                                                 </svg>
                                          </a>
                                   </div>
                                   <p className="text-gray-600 text-sm mb-2">Subscribe to our newsletter:</p>
                                   <form className="space-y-2">
                                          <input
                                                 type="email"
                                                 placeholder="Enter your email"
                                                 className="w-full p-2 rounded-lg border border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                                          />
                                          <button
                                                 type="submit"
                                                 className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                          >
                                                 Subscribe
                                          </button>
                                   </form>
                            </div>
                     </div>

                     {/* Copyright */}
                     <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-500 text-sm">
                            <p>© {new Date().getFullYear()} Dream Pay. All rights reserved.</p>
                     </div>
              </footer>
       );
};

export default Footer;
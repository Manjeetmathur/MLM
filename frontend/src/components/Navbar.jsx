import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../services/api';
import { logout } from '../store/authSlice';
import p1 from '../assets/p1.jpg'

export default function Navbar() {
       const [isOpen, setIsOpen] = useState(false);
       const navigate = useNavigate();
       const dispatch = useDispatch();
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
       const isAdmin = useSelector((state) => state.auth.isAdmin);
       const user = useSelector((state) => state.auth.user);

       const handleLogout = async () => {
              try {
                     await logoutUser();
                     dispatch(logout());
                     navigate('/login');
              } catch (err) {
                     console.error('Logout failed:', err);
                     dispatch(logout()); // Logout even if API fails for safety
                     navigate('/login');
              }
              setIsOpen(false);
       };

       const toggleMenu = () => {
              setIsOpen(!isOpen);
       };

       return (
              <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg z-50">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                            {/* Logo */}
                            <Link
                                   to="/"
                                   className="text-2xl font-bold text-white hover:text-indigo-200 transition-colors duration-300"
                            >
                                  <img src={p1} alt="" className='w-13 rounded-2xl' />
                            </Link>

                            {/* Hamburger Icon for Mobile */}
                            <button
                                   className="text-white md:hidden focus:outline-none hover:text-indigo-200 transition-colors duration-300"
                                   onClick={toggleMenu}
                                   aria-label="Toggle menu"
                            >
                                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path
                                                 strokeLinecap="round"
                                                 strokeLinejoin="round"
                                                 strokeWidth="2"
                                                 d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                          />
                                   </svg>
                            </button>

                            {/* Navigation Links */}
                            <div
                                   className={`${isOpen ? 'block' : 'hidden'
                                          } md:flex md:items-center md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-indigo-600 md:bg-transparent px-4 md:px-0 py-4 md:py-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0'
                                          }`}
                            >
                                   {isAuthenticated ? (
                                          <>
                                                 <Link
                                                        to="/dashboard"
                                                        className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                                        onClick={() => setIsOpen(false)}
                                                 >
                                                        Dashboard
                                                 </Link>
                                                 {!isAdmin && (
                                                        <Link
                                                               to={`/balance/${user._id}`}
                                                               className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                                               onClick={() => setIsOpen(false)}
                                                        >
                                                               Balance
                                                        </Link>
                                                 )}
                                                 {!isAdmin && (
                                                        <Link
                                                               to={`/profile/${user._id}`}
                                                               className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                                               onClick={() => setIsOpen(false)}
                                                        >
                                                               Profile
                                                        </Link>
                                                 )}
                                                 {isAdmin && (
                                                        <Link
                                                               to="/admin/users"
                                                               className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                                               onClick={() => setIsOpen(false)}
                                                        >
                                                               Users
                                                        </Link>
                                                 )}
                                                 <button
                                                        onClick={handleLogout}
                                                        className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300 w-full text-left md:w-auto"
                                                 >
                                                        Logout
                                                 </button>
                                          </>
                                   ) : (
                                          <>
                                                 <Link
                                                        to="/login"
                                                        className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                                        onClick={() => setIsOpen(false)}
                                                 >
                                                        Login
                                                 </Link>
                                                 <Link
                                                        to="/register"
                                                        className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                                        onClick={() => setIsOpen(false)}
                                                 >
                                                        Register
                                                 </Link>
                                          </>
                                   )}
                                   <Link
                                          to="/about"
                                          className="block text-white hover:text-indigo-200 py-2 md:py-0 transition-colors duration-300"
                                          onClick={() => setIsOpen(false)}
                                   >
                                          About
                                   </Link>
                            </div>
                     </div>
              </nav>
       );
}
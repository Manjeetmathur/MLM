import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../services/api';
import { logout } from '../store/authSlice';
import toast from 'react-hot-toast';
import p1 from '../assets/p3.png';
import { IoMenu } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
      dispatch(logout());
      toast.error('Logout failed, but you have been signed out');
      navigate('/login');
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-lg z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center  py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
          <div className="flex items-center space-x-3 bg-gray-800 p-2 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <img src={p1} alt="DreamPay Logo" className="w-10 h-10 rounded-md" />
            <h1 className="text-2xl lg:text-4xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 tracking-tight">
              Dream<span className="text-yellow-400">Pay</span>
            </h1>
          </div>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <IoMenu
            className="text-3xl text-white hover:text-yellow-400 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            disabled={loading}
          />
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-0 absolute md:static top-full left-0 w-full md:w-auto bg-gray-800 md:bg-transparent px-6 md:px-0 py-6 md:py-0 transition-all duration-500 ease-in-out transform ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 md:opacity-100 md:translate-y-0'
          } border-t border-gray-700 md:border-0`}
        >
          {isAuthenticated ? (
            <>
              {!isAdmin  && <Link
                to="/dashboard"
                className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
                style={{ animationDelay: '0.1s' }}
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>}
              {!isAdmin && (
                <>
                  <Link
                    to={`/balance/${user?._id}`}
                    className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
                    style={{ animationDelay: '0.2s' }}
                    onClick={() => setIsOpen(false)}
                  >
                    Balance
                  </Link>
                  <Link
                    to={`/profile/${user?._id}`}
                    className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
                    style={{ animationDelay: '0.3s' }}
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link
                  to="/admin/users"
                  className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
                  style={{ animationDelay: '0.4s' }}
                  onClick={() => setIsOpen(false)}
                >
                  Users
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`block text-gray-200 py-3 md:py-0 text-lg font-medium transition-all duration-300 w-full text-left md:w-auto flex items-center ${
                  loading ? 'opacity-75 cursor-not-allowed' : 'hover:text-yellow-400 hover:bg-gray-700 md:hover:bg-transparent'
                } animate-fade-in-up rounded-md px-3`}
                style={{ animationDelay: '0.5s' }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging out...
                  </span>
                ) : (
                  'Logout'
                )}
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
                style={{ animationDelay: '0.1s' }}
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
                style={{ animationDelay: '0.2s' }}
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
          <Link
            to="/contact"
            className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
            style={{ animationDelay: isAuthenticated ? '0.6s' : '0.3s' }}
            onClick={() => setIsOpen(false)}
          >
            Contact-us
          </Link>
          <Link
            to="/about"
            className="block text-gray-200 hover:text-yellow-400 py-3 md:py-0 text-lg font-medium transition-all duration-300 animate-fade-in-up hover:bg-gray-700 md:hover:bg-transparent rounded-md px-3"
            style={{ animationDelay: isAuthenticated ? '0.6s' : '0.3s' }}
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        .hover\\:bg-gray-700 {
          transition-property: background-color, color;
          transition-duration: 300ms;
        }
      `}</style>
    </nav>
  );
}
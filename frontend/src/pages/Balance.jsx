import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, withdrawMoney } from '../services/api';
import toast from 'react-hot-toast';

const Balance = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [money, setMoney] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { id } = useParams();

  const fetchUser = async () => {
    try {
      setLoading(true);
      const result = await getUserById({ id });
      if (result.data.success) {
        setUser(result.data.user);
      } else {
        toast.error('User info not available');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [isAuthenticated, navigate]);

  const requestPayment = async () => {
    try {
      setRequestLoading(true);
      const amount = Number(money);
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount.');
      }
      if (amount < 50) {
        throw new Error('Amount must be greater than ₹50.');
      }
      if (amount > (user?.balance || 0)) {
        throw new Error('Amount exceeds your available balance.');
      }
      const res = await withdrawMoney({ userId: user._id, money: amount });
      if (res.data.success) {
        await fetchUser();
        setMoney('');
        setMessage('Withdrawal request submitted. Funds will be credited within 24 hours.');
        toast.success('Withdrawal request submitted successfully.');
      } else {
        throw new Error('Withdrawal request failed.');
      }
    } catch (error) {
      toast.error(error.message);
      setMessage('');
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex justify-center items-center bg-gradient-to-br from-indigo-200 via-blue-200 to-purple-200py-12  px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="flex items-center space-x-2 animate-fade-in-up">
              <svg
                className="animate-spin h-8 w-8 text-indigo-600"
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
              <p className="text-3xl font-semibold text-gray-800">Loading...</p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12 animate-fade-in-down">
              Manage Your Balance
            </h1>

            {/* Balance Display */}
            <div className="bg-white p-8 rounded-2xl shadow-xl mb-8 flex flex-col items-center transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">Current Balance</h2>
              <p className="text-4xl font-bold text-green-600">₹{user?.balance?.toLocaleString() || '0'}</p>
            </div>

            {/* Withdraw Section */}
            <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">Withdraw Money</h2>
              <div className="w-full max-w-sm mb-6">
                <input
                  type="number"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                    money && (Number(money) < 50 || Number(money) > (user?.balance || 0)) ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter amount for withdrawal (min ₹50)"
                  disabled={requestLoading}
                  min="0"
                />
              </div>

              <button
                onClick={requestPayment}
                className={`w-full max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${
                  requestLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                }`}
                disabled={requestLoading}
              >
                {requestLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
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
                    Processing...
                  </span>
                ) : (
                  'Request Withdrawal'
                )}
              </button>

              {message && (
                <p className="text-green-600 text-md text-center mt-4 font-medium animate-fade-in-up">{message}</p>
              )}
              <p className="text-gray-500 text-sm text-center mt-3">
                Note: Funds will be credited within 24 hours of withdrawal request.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
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
            opacity: 0.15;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.25;
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
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Balance;
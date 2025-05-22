import { useState } from 'react';
import { getProfile, loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, userData } from '../store/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
       const [formData, setFormData] = useState({ email: '', password: '' });
       const [error, setError] = useState('');
       const [loading, setLoading] = useState(false);
       const navigate = useNavigate();
       const dispatch = useDispatch();

       const getUserProfile = async () => {
              try {
                     const response = await getProfile();
                     dispatch(userData(response.data.user));
              } catch (err) {
                     if (err.response?.status === 401) {
                            navigate('/login');
                     }
              }
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                     setLoading(true);
                     const response = await loginUser(formData);
                     dispatch(login(response.data || 'authenticated'));
                     if (response.data.success) {
                            await getUserProfile();
                            navigate('/dashboard');
                            toast.success("Login successful");
                     } else {
                            toast.error("Unauthorized access");
                     }
              } catch (err) {
                     setError(err.response?.data?.message || 'Login failed');
              } finally {
                     setLoading(false);
              }
       };

       return (
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-100 py-12 pt-20 relative overflow-hidden">
                     {/* Background decorative elements */}
                     <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
                            <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
                     </div>

                     <div className="max-w-md w-full mx-auto p-8 bg-white rounded-2xl shadow-xl transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up relative z-10">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-6 animate-fade-in-down">
                                   Login to <span className="text-indigo-600">Dream Pay</span>
                            </h2>
                            {error && (
                                   <p className="text-red-500 text-center mb-6 bg-red-50 p-3 rounded-lg font-medium animate-fade-in-up">
                                          {error}
                                   </p>
                            )}
                            <form onSubmit={handleSubmit}>
                                   <div className="mb-6">
                                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                 Email
                                          </label>
                                          <input
                                                 type="email"
                                                 id="email"
                                                 placeholder="Enter your email"
                                                 value={formData.email}
                                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                 className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                                 required
                                                 disabled={loading}
                                          />
                                   </div>
                                   <div className="mb-6">
                                          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                                 Password
                                          </label>
                                          <input
                                                 type="password"
                                                 id="password"
                                                 placeholder="Enter your password"
                                                 value={formData.password}
                                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                 className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                                 required
                                                 disabled={loading}
                                          />
                                   </div>
                                   <button
                                          type="submit"
                                          className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                                                 }`}
                                          disabled={loading}
                                   >
                                          {loading ? (
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
                                                        Logging in...
                                                 </span>
                                          ) : (
                                                 'Login'
                                          )}
                                   </button>
                                   <p className="mt-6 text-center text-gray-600 text-md">
                                          Don't have an account?{' '}
                                          <Link
                                                 to="/register"
                                                 className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline transition-colors duration-200"
                                          >
                                                 Register
                                          </Link>
                                   </p>
                            </form>
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
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
              </div>
       );
}
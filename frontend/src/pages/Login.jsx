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
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUserProfile = async () => {
    try {
      const response = await getProfile();
      dispatch(userData(response.data.user));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error('Failed to fetch profile. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      // Basic email format validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Please enter a valid email address.');
      }
      const response = await loginUser(formData);
      if (response.data.success) {

        dispatch(login(response.data || 'authenticated'));
        await getUserProfile();
        if (response?.data?.admin) {
          navigate("/admin/users")
        } else {
          navigate('/dashboard');

        }
        toast.success('Login successful!');
      } else {
        throw new Error('Unauthorized access. Please check your credentials.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please check your connection.'
      );
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-gray-900 mt-10 py-12 pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        {/* Particle Effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute rounded-full bg-indigo-400 opacity-30"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        {/* Introduction Section */}
        <div
          className="mb-8 text-center animate-fade-in-down"
          data-aos="fade-down"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome to <span className="text-indigo-400">Dream Pay</span>
          </h1>
          <p className="text-lg text-gray-300">
            Log in to access your account and start building your financial future
            with our trusted MLM platform.
          </p>
        </div>

        {/* Login Form */}
        <div
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-600/50 
          transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-6">
            Login
          </h2>
          {error && (
            <p
              className="text-red-400 text-center mb-6 bg-red-900/50 p-3 rounded-lg font-medium 
              animate-fade-in-up"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 
                focus:ring-indigo-400 focus:border-transparent transition-all duration-200 
                bg-gray-700 text-gray-200 placeholder-gray-400 hover:bg-gray-600 ${formData.email &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                    ? 'border-red-500'
                    : 'border-gray-600'
                  }`}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-4 border border-gray-600 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all 
                duration-200 bg-gray-700 text-gray-200 placeholder-gray-400 hover:bg-gray-600 
                pr-12"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-400 
                hover:text-gray-300 focus:outline-none"
                disabled={loading}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="flex justify-between items-center mb-6">
              {/* <Link
                to="/forgot-password"
                className="text-indigo-400 hover:text-indigo-300 text-sm font-medium 
                transition-colors duration-200"
              >
                Forgot Password?
              </Link> */}
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-400 hover:text-indigo-300 font-medium 
                  hover:underline transition-colors duration-200"
                >
                  Register
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
              p-4 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-400 
              focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md 
              hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center 
              ${loading
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:from-indigo-700 hover:to-purple-700'
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
          </form>
          {/* Social Login Placeholder */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">Or sign in with</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-600 text-gray-300 py-2 px-4 rounded-lg opacity-50 
                cursor-not-allowed"
                disabled
              >
                Google (Coming Soon)
              </button>
              <button
                className="bg-gray-600 text-gray-300 py-2 px-4 rounded-lg opacity-50 
                cursor-not-allowed"
                disabled
              >
                Facebook (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and particles */}
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
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 30 - 15}px);
            opacity: 0.2;
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
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
        .particle {
          animation: float linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    referredBy: '',
    phoneNo: '',
    name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser({
        email: formData.email,
        password: formData.password,
        referredBy: formData.referredBy,
        phoneNo: formData.phoneNo,
        name: formData.name,
      });
      if (res.data.success) {
        toast.success('Registration successful');
        navigate('/login');
      } else {
        toast.error('Registration failed');
        setError('Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800  mt-10 py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200 dark:bg-purple-800 rounded-full opacity-15 blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transform hover:shadow-2xl transition-all duration-300 animate-fade-in-up relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6 animate-fade-in-down">
          Register with <span className="text-indigo-600 dark:text-indigo-400">Dream Pay</span>
        </h2>
        {error && (
          <p className="text-red-500 dark:text-red-400 text-center mb-6 bg-red-50 dark:bg-red-900 p-3 rounded-lg font-medium animate-fade-in-up">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          {[
            { id: 'name', label: 'Name', type: 'text' },
            { id: 'phoneNo', label: 'Phone Number', type: 'text' },
            { id: 'email', label: 'Email', type: 'email' },
            { id: 'password', label: 'Password', type: 'password' },
            { id: 'confirmPassword', label: 'Confirm Password', type: 'password' },
            { id: 'referredBy', label: 'Referral Code', type: 'text', optional: true },
          ].map(({ id, label, type, optional }) => (
            <div className="mb-6" key={id}>
              <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {label} {optional && <span className="text-gray-500 text-xs">(Optional)</span>}
              </label>
              <input
                type={type}
                id={id}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={formData[id]}
                onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 hover:bg-white dark:hover:bg-gray-700 ${
                  id.includes('password') &&
                  formData.password &&
                  formData.password !== formData.confirmPassword &&
                  (id === 'password' || id === 'confirmPassword')
                    ? 'border-red-500'
                    : 'border-gray-200'
                }`}
                required={!optional}
                disabled={loading}
              />
            </div>
          ))}

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
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
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-300 text-md">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold hover:underline transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.2); opacity: 0.25; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.8s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-pulse-slow { animation: pulseSlow 6s ease-in-out infinite; }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phoneNo':
        if (!/^\d{10}$/.test(value)) {
          newErrors.phoneNo = 'Phone number must be 10 digits';
        } else {
          delete newErrors.phoneNo;
        }
        break;
      case 'password':
        if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }
    if (!/^\d{10}$/.test(formData.phoneNo)) {
      validationErrors.phoneNo = 'Phone number must be 10 digits';
    }
    if (formData.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }
    if (!agreeTerms) {
      validationErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Please fix the errors in the form');
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
        setShowPopup(true);
        toast.success('Registration successful!');
      } else {
        throw new Error(res.data.message || 'Registration failed');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again';
      setErrors({ server: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 min-h-screen flex flex-col items-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute bg-indigo-400/20 rounded-full animate-[float_10s_infinite]"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="mb-8 text-center animate-[fadeInDown_0.8s_ease-out]" data-aos="fade-down">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Create Your <span className="text-indigo-400">Dream Pay</span> Account
          </h1>
          <p className="text-base text-gray-300">
            Join our trusted MLM platform to unlock passive income and referral bonuses
          </p>
        </div>

        <div
          className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-600/50 hover:shadow-indigo-500/50 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-2xl font-bold text-center text-white mb-6">Register</h2>
          {errors.server && (
            <p
              className="text-red-400 text-center mb-6 bg-red-900/50 p-3 rounded-lg text-sm"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {errors.server}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: 'name', label: 'Name', type: 'text' },
              { id: 'phoneNo', label: 'Phone Number', type: 'text', placeholder: 'Enter 10-digit phone number' },
              { id: 'email', label: 'Email', type: 'email' },
              {
                id: 'password',
                label: 'Password',
                type: showPassword ? 'text' : 'password',
                toggle: true,
                toggleState: showPassword,
                toggleAction: () => setShowPassword(!showPassword),
              },
              {
                id: 'confirmPassword',
                label: 'Confirm Password',
                type: showConfirmPassword ? 'text' : 'password',
                toggle: true,
                toggleState: showConfirmPassword,
                toggleAction: () => setShowConfirmPassword(!showConfirmPassword),
              },
              { id: 'referredBy', label: 'Referral Code', type: 'text', optional: true },
            ].map(({ id, label, type, optional, toggle, toggleState, toggleAction, placeholder }) => (
              <div className="relative" key={id}>
                <label htmlFor={id} className="block text-sm font-semibold text-gray-300 mb-2">
                  {label} {optional && <span className="text-gray-500 text-xs">(Optional)</span>}
                </label>
                <input
                  type={type}
                  id={id}
                  placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
                  value={formData[id]}
                  onChange={handleChange}
                  name={id}
                  className={`w-full p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400 transition-all ${errors[id] ? 'border-red-500' : 'border-gray-600'} ${toggle ? 'pr-12' : ''}`}
                  required={!optional}
                  disabled={loading}
                />
                {toggle && (
                  <button
                    type="button"
                    onClick={toggleAction}
                    className="absolute right-3 top-[58%] -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    disabled={loading}
                  >
                    {toggleState ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                )}
                {errors[id] && <p className="text-red-400 text-sm mt-1">{errors[id]}</p>}
              </div>
            ))}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
                className="h-4 w-4 text-indigo-400 focus:ring-indigo-400 border-gray-600 rounded bg-gray-700"
                disabled={loading}
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms}</p>}
            <button
              type="submit"
              className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-semibold transition-all hover:-translate-y-1 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'}`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
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
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
            <p className="mt-4 text-center text-sm text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Congratulatory Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl w-full max-w-md border-2 border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-padding hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500">
            {/* Confetti Dots */}
            {[...Array(10)].map((_, i) => (
              <div
                key={`confetti-${i}`}
                className={`absolute rounded-full ${i % 2 ? 'bg-teal-400' : 'bg-indigo-400'} animate-[confetti_3s_ease-out]`}
                style={{
                  width: `${Math.random() * 6 + 4}px`,
                  height: `${Math.random() * 6 + 4}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              />
            ))}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 animate-[pulse_2s_infinite]">
                Congratulations!
              </h3>
              <p className="text-gray-300 text-center mb-6 text-base">
                You've joined <span className="text-teal-400 font-semibold">Dream Pay</span> with a{' '}
                <span className="text-teal-400 font-semibold">₹50 signup bonus</span>!
                {formData.referredBy && (
                  <>
                    {' '}
                    Plus, a <span className="text-teal-400 font-semibold">₹50 referral bonus</span> for using a code!
                  </>
                )}
              </p>
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 hover:-translate-y-1 hover:ring-2 hover:ring-teal-400/30 transition-all text-lg font-semibold"
              >
                Start Earning Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
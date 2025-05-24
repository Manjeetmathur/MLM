import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { verifyKYCOTP } from '../services/api';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const email = user?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!otp) {
      setError('Please enter the OTP');
      toast.error('Please enter the OTP');
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError('OTP must be a 6-digit number');
      toast.error('OTP must be a 6-digit number');
      return;
    }

    if (!email) {
      setError('Email not found. Please request OTP again.');
      toast.error('Email not found');
      navigate('/request-otp');
      return;
    }

    try {
      setLoading(true);
      const response = await verifyKYCOTP({ email, otp });
      if (response.data.success) {
        setSuccess(response.data.message);
        toast.success('KYC verified successfully');
        navigate('/dashboard');
      } else {
        throw new Error(response.data.message || 'OTP verification failed');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'OTP verification failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 border border-indigo-600/50" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Verify OTP</h2>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4 bg-red-600/20 p-2 rounded">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-sm text-center mb-4 bg-green-600/20 p-2 rounded">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="otp" className="block text-sm text-gray-300 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="e.g., 123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded hover:from-indigo-700 hover:to-purple-700 transition ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              'Verify OTP'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
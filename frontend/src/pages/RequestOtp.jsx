import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { requestKYCOTP } from '../services/api';
import toast from 'react-hot-toast';

const RequestOTP = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: user.email,
    AccountNo: '',
    AccountHolderName: '',
    ifscCode: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const { AccountNo, AccountHolderName, ifscCode } = formData;
    if (!AccountNo || !AccountHolderName || !ifscCode) {
      return 'All fields are required';
    }
    if (!/^\d{8,20}$/.test(AccountNo)) {
      return 'Account number must be 8-20 digits';
    }
    if (!/^[a-zA-Z\s]+$/.test(AccountHolderName)) {
      return 'Holder name must contain only letters and spaces';
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      return 'Invalid IFSC code (e.g., SBIN0001234)';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await requestKYCOTP(formData);
      console.log(response)
      if (response.data.success) {
        setSuccess(response.data.message);
        toast.success("Otp sent");
        navigate('/verify-otp', { state: { email: user.email } });
      } else {
        throw new Error(response.data.message || 'Failed to request OTP');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to request OTP';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 border border-indigo-600/50" data-aos="fade-up">
        <h2 className="text-2xl font-bold text-white text-center mb-6">KYC Verification</h2>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4 bg-red-600/20 p-2 rounded">{error}</p>
        )}
        {success && (
          <p className="text-green-400 text-sm text-center mb-4 bg-green-600/20 p-2 rounded">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="AccountNo" className="block text-sm text-gray-300 mb-1">
              Account Number
            </label>
            <input
              type="text"
              id="AccountNo"
              name="AccountNo"
              placeholder="e.g., 123456789012"
              value={formData.AccountNo}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="AccountHolderName" className="block text-sm text-gray-300 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              id="AccountHolderName"
              name="AccountHolderName"
              placeholder="e.g., John Doe"
              value={formData.AccountHolderName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:ring-indigo-400 focus:border-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="ifscCode" className="block text-sm text-gray-300 mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              placeholder="e.g., SBIN0001234"
              value={formData.ifscCode}
              onChange={handleChange}
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
                Sending...
              </span>
            ) : (
              'Get OTP'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestOTP;
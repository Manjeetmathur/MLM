import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestKYCOTP } from '../services/api';
import { useSelector } from 'react-redux';

const RequestOTP = () => {
       const user= useSelector((state) => state.auth.user);

       const [formData, setFormData] = useState({
              email: user.email,
              AccountNo: '',
              AccountHolderName: '',
              ifscCode : ''
       });
       const [error, setError] = useState('');
       const [success, setSuccess] = useState('');
       const [loading, setLoading] = useState(false);
       const navigate = useNavigate();

       const handleSubmit = async (e) => {
              e.preventDefault();
              setError('');
              setSuccess('');

              const {  AccountNo, AccountHolderName,ifscCode } = formData;

              // Basic validation
              if (  !AccountNo || !AccountHolderName || !ifscCode) {
                     setError('Please fill in all fields');
                     return;
              }


           

              try {
                     // Placeholder for API call to request OTP
                     setLoading(true)
                     const response = await requestKYCOTP({ email :user.email, AccountNo, AccountHolderName ,ifscCode});
                     console.log(response)
                     setSuccess(response.data.message);
                     navigate('/verify-otp', { state: { email:user.email } });

                     // Mock success response
                     setSuccess('OTP sent to your email');
                     setTimeout(() => {
                            navigate('/verify-otp', { state: { email:user.email } });
                     }, 1500);
                     setLoading(false)
              } catch (err) {
                     setError(err.message || 'Failed to request OTP');
              }
       };

       const handleChange = (e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
       };

       return (
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 py-12">
                     <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg" data-aos="fade-up">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                                   Account Verification
                            </h2>
                            {error && (
                                   <p className="text-red-500 text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>
                            )}
                            {success && (
                                   <p className="text-green-500 text-center mb-4 bg-green-50 p-2 rounded-lg">
                                          {success}
                                   </p>
                            )}
                            <form onSubmit={handleSubmit}>
                                   {/* Email Input */}
                                   <div className="mb-5">
                                          <label htmlFor="AccountNo" className="block text-sm font-medium text-gray-700 mb-1">
                                          Account Number
                                          </label>
                                          <input
                                                 type="text"
                                                 id="AccountNo"
                                                 name="AccountNo"
                                                 placeholder="Enter your Account Number"
                                                 value={formData.AccountNo}
                                                 onChange={handleChange}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                 required
                                          />
                                   </div>

                                   {/* Aadhar Number Input */}
                                   <div className="mb-5">
                                          <label htmlFor="AccountNo" className="block text-sm font-medium text-gray-700 mb-1">
                                                 Account Holder Name
                                          </label>
                                          <input
                                                 type="text"
                                                 id="AccountHolderName"
                                                 name="AccountHolderName"
                                                 placeholder="Enter Account Holder Name"
                                                 value={formData.AccountHolderName}
                                                 onChange={handleChange}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                 required
                                          />
                                   </div>

                                   {/* AccountHolderName Number Input */}
                                   <div className="mb-6">
                                          <label htmlFor="AccountHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                                                 Bank IFSC Code
                                          </label>
                                          <input
                                                 type="text"
                                                 id="ifscCode"
                                                 name="ifscCode"
                                                 placeholder="Enter your Bank IFSC Code"
                                                 value={formData.ifscCode}
                                                 onChange={handleChange}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                 required
                                          />
                                   </div>

                                   {/* Get OTP Button */}
                                   <button
                                          type="submit"
                                          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold"
                                   >
                                          {loading ? "Please wait ..." : "Get OTP"}
                                   </button>
                            </form>
                     </div>
              </div>
       );
};

export default RequestOTP;
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyKYCOTP } from '../services/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
       const [otp, setOtp] = useState('');
       const [error, setError] = useState('');
       const [success, setSuccess] = useState('');
       const navigate = useNavigate();
       const location = useLocation();
       const email = location.state?.email || ''; // Get email from state (passed from RequestOTP)
       const user= useSelector((state) => state.auth.user);

       const handleSubmit = async (e) => {
              e.preventDefault();
              setError('');
              setSuccess('');

              if (!otp) {
                     setError('Please enter the OTP');
                     return;
              }

              // Validate OTP (6 digits)
              const otpRegex = /^\d{6}$/;
              if (!otpRegex.test(otp)) {
                     setError('OTP must be a 6-digit number');
                     return;
              }

              try {
                     // Placeholder for API call to verify OTP
                     const response = await verifyKYCOTP({email:user.email, otp});
                     setSuccess(response.message);
                     navigate('/dashboard');

                     // Mock success response
                     setSuccess('OTP verified successfully');
                     toast.success("Congratulation Account verification successfully")
                     setTimeout(() => {
                            alert("KYC Verified")
                            navigate('/dashboard');
                     }, 1500);
              } catch (err) {
                     setError(err.message || 'OTP verification failed');
              }
       };

       return (
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 py-12">
                     <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg" data-aos="fade-up">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                                   Verify OTP
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
                                   {/* OTP Input */}
                                   <div className="mb-6">
                                          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                                 Enter OTP
                                          </label>
                                          <input
                                                 type="text"
                                                 id="otp"
                                                 placeholder="Enter the 6-digit OTP"
                                                 value={otp}
                                                 onChange={(e) => setOtp(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                 required
                                          />
                                   </div>

                                   {/* Verify OTP Button */}
                                   <button
                                          type="submit"
                                          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold"
                                   >
                                          Verify OTP
                                   </button>
                            </form>
                     </div>
              </div>
       );
};

export default VerifyOTP;
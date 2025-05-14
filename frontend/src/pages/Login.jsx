import { useState } from 'react';
import { getProfile, loginUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation
import { useDispatch } from 'react-redux';
import { login, userData } from '../store/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
       const [formData, setFormData] = useState({ email: '', password: '' });
       const [error, setError] = useState('');
       const navigate = useNavigate();
       const dispatch = useDispatch();
       const getUserProfile = async () => {
              try {
                     const response = await getProfile();
                     dispatch(userData(response.data.user))

              } catch (err) {
                     if (err.response?.status === 401) {
                            navigate('/login');
                     }
              }
       };
       const handleSubmit = async (e) => {
              e.preventDefault();
              try {
                     const response = await loginUser(formData);
                     dispatch(login(response.data || 'authenticated'));
                     if(response.data.success){
                            await getUserProfile()
                            navigate('/dashboard');
                            toast.success("Login successful")
                     }
                     else{
                            toast.error("Unauthorized access")
                     }
                    
              } catch (err) {
                     setError(err.response?.data?.message || 'Login failed');
              }
       };

       return (
              <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from--100 to-gray-300 py-12 pt-28"
                    >
                     <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg" data-aos="fade-up">
                            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Dream Pay</h2>
                            {error && (
                                   <p className="text-red-500 text-center mb-4 bg-red-50 p-2 rounded-lg">{error}</p>
                            )}
                            <form onSubmit={handleSubmit}>
                                   <div className="mb-5">
                                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                 Email
                                          </label>
                                          <input
                                                 type="email"
                                                 id="email"
                                                 placeholder="Enter your email"
                                                 value={formData.email}
                                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                 required
                                          />
                                   </div>
                                   <div className="mb-6">
                                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                                 Password
                                          </label>
                                          <input
                                                 type="password"
                                                 id="password"
                                                 placeholder="Enter your password"
                                                 value={formData.password}
                                                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                 required
                                          />
                                   </div>
                                   <button
                                          type="submit"
                                          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-semibold"
                                   >
                                          Login
                                   </button>
                                   <p className="mt-4 text-center text-gray-600">
                                          Don't have an account?{' '}
                                          <Link to="/register" className="text-blue-600 hover:underline font-medium">
                                                 Register
                                          </Link>
                                   </p>
                            </form>
                     </div>
              </div>
       );
}
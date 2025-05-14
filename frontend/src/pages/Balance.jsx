import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, withdrawMoney } from '../services/api';
import toast from 'react-hot-toast';

const Balance = () => {
       const navigate = useNavigate();
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
       const [money, setMoney] = useState('');
       const [user, setuser] = useState('');
       const [loading, setloading] = useState(false);
       const [message, setMessage] = useState('');
       const [requestLoading, setRequestLoading] = useState(false);
       const { id } = useParams()
       const fetchUser = async () => {

              try {
                     setloading(true)
                     const result = await getUserById({ id });
                     setuser(result.data.user);
                     if (!result.data.success) {
                            toast.error("User info not Available");
                     }
              } catch (error) {
                     console.error("Error fetching user data:", error);
              }
              setloading(false)
       };
       useEffect(() => {

              fetchUser();

              if (!isAuthenticated) {
                     navigate('/login');
              }
       }, []);

       const requestPayment = async () => {
              try {
                     setRequestLoading(true);
                     const amount = Number(money);
                     console.log(amount)

                     if (amount < 50) {
                            throw new Error('Amount should be greater than 50.');
                     }
                     if (amount > user.balance) {
                            throw new Error('Amount should be less than your balance.');
                     }
                     const res = await withdrawMoney({ userId: user._id, money: amount });
                     if (res.data.success) {
                            fetchUser()
                     }
                     setMoney('');
                     toast.success('Wait for 24 hours to credit money.')
                     setMessage('Wait for 24 hours to credit money.');
              } catch (error) {
                     toast.error(error.message);
              } finally {
                     setRequestLoading(false);
              }
       };

       return (
              <div className="min-h-screen flex justify-center items-center bg-gray-100 py-28 px-4 sm:px-6 lg:px-8">
                     {loading ? <p className='text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10'>loading...</p> : <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
                                   Manage Your Balance
                            </h1>

                            {/* Balance Display */}
                            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 flex flex-col items-center">
                                   <h2 className="text-xl font-semibold text-gray-700 mb-2">Current Balance</h2>
                                   <p className="text-3xl font-bold text-green-600">Rs. {user?.balance || 0}</p>
                            </div>

                            {/* Withdraw Section */}
                            <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
                                   <h2 className="text-xl font-semibold text-gray-700 mb-4">Withdraw Money</h2>
                                   <div className="w-full max-w-sm mb-4">
                                          <input
                                                 type="number"
                                                 value={money}
                                                 onChange={(e) => setMoney(e.target.value)}
                                                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                                                 placeholder="Enter amount for withdrawal"
                                                 disabled={requestLoading}
                                          />
                                   </div>

                                   <button
                                          onClick={requestPayment}
                                          className={`w-full max-w-sm bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${requestLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                 }`}
                                          disabled={requestLoading}
                                   >
                                          {requestLoading ? 'Requesting...' : 'Request for Payment'}
                                   </button>

                                   {message && (
                                          <p className="text-green-600 text-sm text-center mt-4">{message}</p>
                                   )}
                                   <p className="text-gray-500 text-sm text-center mt-2">
                                          Note: You will receive money within 24 hours of withdrawal.
                                   </p>
                            </div>
                     </div>}
              </div>
       );
};

export default Balance;
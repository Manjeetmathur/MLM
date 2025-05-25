import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getProfile } from '../../services/api';

const D3 = () => {
       const [showTaskPopup, setShowTaskPopup] = useState(true);
       const [user, setProfile] = useState(null);
       const navigate = useNavigate();

       const getUserProfile = async () => {
              try {
                     const response = await getProfile();
                     setProfile(response.data.user);
              } catch (err) {
                     console.error('Error fetching profile:', err);
                     if (err.response?.status === 401) {
                            toast.error('Session expired. Please log in again.');
                            navigate('/login');
                     }
              }
       };

       useEffect(() => {
              getUserProfile();
       }, []);

       return (
              <section className="mt-20 bg-gray-900 py-16 px-4 sm:px-8 lg:px-12">
                     <div className="max-w-7xl mx-auto">
                            <h2
                                   className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-12"
                                   data-aos="fade-down"
                            >
                                   Your Investment Plans
                            </h2>

                            {/* Complete Task Popup */}
                            {!user?.plans?.length && showTaskPopup && user && (
                                   <div
                                          className="fixed top-4 right-4 bg-gray-800 p-4 rounded-lg max-w-[200px] border border-gray-700 shadow-lg animate-fade z-50"
                                   >
                                          <button
                                                 onClick={() => setShowTaskPopup(false)}
                                                 className="absolute top-1 right-1 text-gray-400 hover:text-gray-200 text-sm w-5 h-5 flex items-center justify-center"
                                          >
                                                 X
                                          </button>
                                          <p className="text-gray-300 text-sm mb-3">
                                                 Join a plan to start earning!
                                          </p>
                                          <Link
                                                 to="/#packages"
                                                 className="block w-full bg-indigo-600 text-white text-sm py-2 rounded-md hover:bg-indigo-700 transition-colors text-center"
                                          >
                                                 View Plans
                                          </Link>
                                   </div>
                            )}

                            {user === null ? (
                                   <div className="flex justify-center items-center min-h-[20vh]">
                                          <div className="flex items-center space-x-3">
                                                 <svg
                                                        className="animate-spin h-8 w-8 text-indigo-400"
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
                                                 <p className="text-lg font-medium text-gray-300">Loading Plans...</p>
                                          </div>
                                   </div>
                            ) : (
                                   <div>
                                          {Array.isArray(user?.plans) && user.plans.length > 0 ? (
                                                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                        {user.plans.map((plan, idx) => (
                                                               <div
                                                                      key={idx}
                                                                      className="border border-gray-600 rounded-2xl p-6 bg-gray-700/80 backdrop-blur-sm shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-500 flex flex-col items-center"
                                                                      data-aos="fade-up"
                                                                      data-aos-delay={idx * 100}
                                                               >
                                                                      <p className="text-lg font-semibold text-gray-300 mb-2">
                                                                             Package Amount:{' '}
                                                                             <span className="text-indigo-300 font-bold">₹{plan?.packageAmount?.toLocaleString()}</span>
                                                                      </p>
                                                                      <p className="text-lg font-semibold text-gray-300 mb-4">
                                                                             Daily Income:{' '}
                                                                             <span className="text-green-300 font-bold">₹{plan?.dailyIncome?.toLocaleString()}</span>
                                                                      </p>
                                                                      <Link
                                                                             to={`/plans/${idx}`}
                                                                             className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 text-sm rounded-full hover:from-indigo-700 hover:to-purple-700 hover:ring-2 hover:ring-indigo-400/30 transition-all duration-300 font-medium shadow-sm"
                                                                      >
                                                                             Go for Streak
                                                                      </Link>
                                                               </div>
                                                        ))}
                                                 </div>
                                          ) : (
                                                 <div
                                                        className="bg-gray-800 p-6 rounded-xl text-center border border-gray-700"
                                                        data-aos="fade-up"
                                                 >
                                                        <p className="text-gray-400 text-lg">
                                                               No plans yet. Explore our{' '}
                                                               <Link to="/#packages" className="text-indigo-400 hover:underline font-medium">
                                                                      investment packages
                                                               </Link>
                                                               !
                                                        </p>
                                                 </div>
                                          )}
                                   </div>
                            )}
                     </div>
              </section>
       );
};

export default D3;
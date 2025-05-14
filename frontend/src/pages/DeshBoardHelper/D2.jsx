import React from 'react';
import { Link } from 'react-router-dom';

const D2 = ({ profile, level, progress, referrals }) => {
       let referralLink = window.location.href;
       referralLink =
              referralLink.split('').reverse().join('').slice(9).split('').reverse().join('') + 'register';

       const openWhatsapp = () => {
              const message = `${referralLink} \nReferral Code: ${profile.referralCode} \nUse this referral code while registering`;
              window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
       };

       return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white rounded-xl shadow-lg">
                     {/* Available Balance */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Available Balance</h2>
                            <p className="text-2xl font-bold text-green-400">Rs. {profile?.balance || '0'}</p>
                     </div>

                     {/* Referrals Income */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Referrals Income</h2>
                            <Link
                                   to="/balance"
                                   className="text-xl font-medium text-white hover:text-indigo-200 transition-colors duration-300"
                            >
                                   Rs. {referrals?.referrals?.length * 50 || 0}
                            </Link>
                     </div>

                     {/* Transactions */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Transactions</h2>
                            <Link
                                   to="/balance"
                                   className="inline-block bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition-colors duration-300"
                            >
                                   See Your Wallet
                            </Link>
                     </div>

                     {/* Level Progress */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Your Level: {level}</h2>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                   <div
                                          className="bg-teal-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                                          style={{ width: `${progress}%` }}
                                   />
                            </div>
                            <p className="text-sm text-gray-200 mt-2">
                                   {progress}% to Level {level + 1}
                            </p>
                     </div>

                     {/* Referral Link */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Referral Link</h2>
                            <p className="text-sm text-gray-200 break-all mb-3">{referralLink}</p>
                            <button
                                   onClick={openWhatsapp}
                                   className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
                            >
                                   Share on WhatsApp
                            </button>
                     </div>

                     {/* Referral Code */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Referral Code</h2>
                            <p className="text-lg font-medium text-green-400 mb-3">{profile.referralCode || 'N/A'}</p>
                            <button
                                   onClick={() => navigator.clipboard.writeText(profile.referralCode)}
                                   className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                            >
                                   Copy
                            </button>
                     </div>

                     {/* Verification (Commented Out) */}
                     <div className="p-5 bg-indigo-600 text-center rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h2 className="text-lg font-semibold text-white mb-2">Verification</h2>
                            {profile.kycVerified ? (
                                   <p className="text-lg font-medium text-green-400">Done</p>
                            ) : (
                                   <Link to="/request-otp" className="text-lg font-medium text-teal-400 hover:text-teal-300 transition-colors duration-300">
                                          Verify Now
                                   </Link>
                            )}
                     </div>
              </div>
       );
};

export default D2;
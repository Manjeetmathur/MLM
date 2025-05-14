import React from 'react';

const F2 = () => {
       return (
              <section className="py-16 bg-gray-50">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-800">
                                   Why Choose Dream Pay?
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                   {/* Proven System */}
                                   <div className="text-center">
                                          <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                                                 <svg
                                                        className="w-8 h-8 text-indigo-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                 >
                                                        <path
                                                               strokeLinecap="round"
                                                               strokeLinejoin="round"
                                                               strokeWidth="2"
                                                               d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zm0 8c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                                                        />
                                                 </svg>
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Proven System</h3>
                                          <p className="text-gray-600">
                                                 Our MLM model is tested and trusted, delivering consistent returns to members worldwide.
                                          </p>
                                   </div>

                                   {/* Lucrative Referrals */}
                                   <div className="text-center">
                                          <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                                                 <svg
                                                        className="w-8 h-8 text-indigo-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                 >
                                                        <path
                                                               strokeLinecap="round"
                                                               strokeLinejoin="round"
                                                               strokeWidth="2"
                                                               d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857h10M9 4h6m-6 0a3 3 0 013-3h0a3 3 0 013 3m-6 0v2m6-2v2"
                                                        />
                                                 </svg>
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Lucrative Referrals</h3>
                                          <p className="text-gray-600">
                                                 Earn generous bonuses by inviting friends and building your network effortlessly.
                                          </p>
                                   </div>

                                   {/* 24/7 Support */}
                                   <div className="text-center">
                                          <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-sm">
                                                 <svg
                                                        className="w-8 h-8 text-indigo-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                 >
                                                        <path
                                                               strokeLinecap="round"
                                                               strokeLinejoin="round"
                                                               strokeWidth="2"
                                                               d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.21 0-4 1.79-4 4v2h8v-2c0-2.21-1.79-4-4-4z"
                                                        />
                                                 </svg>
                                          </div>
                                          <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
                                          <p className="text-gray-600">
                                                 Our dedicated team is available round-the-clock to assist you at every step.
                                          </p>
                                   </div>
                            </div>
                     </div>
              </section>
       );
};

export default F2;
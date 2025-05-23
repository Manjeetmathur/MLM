import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const packages = [
       { id: 1, amount: 250, dailyIncome: 25 },
       { id: 2, amount: 500, dailyIncome: 50 },
       { id: 3, amount: 1000, dailyIncome: 100 },
       { id: 4, amount: 2500, dailyIncome: 250 },
       { id: 5, amount: 5000, dailyIncome: 500 },
];

const F1 = () => {
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

       return (
              <section className="py-16 bg-none">
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <h2
                                   className="text-2xl md:text-3xl font-bold text-center mb-4 text-white"
                                   data-aos="fade-up"
                            >
                                   Choose the Perfect Plan for Your Success Journey
                            </h2>
                            <p
                                   className="text-center text-lg text-gray-400 mb-12"
                                   data-aos="fade-up"
                                   data-aos-delay="100"
                            >
                                   Start earning with our tailored investment plans.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols- gap-8">
                                   {packages.map((pkg, index) => (
                                          <div
                                                 key={pkg.id}
                                                 className={`bg-gray-800 p-6 rounded-xl shadow-md border 
              ${pkg.id === 3 ? 'border-purple-600' : 'border-indigo-600'} 
              hover:shadow-lg hover:shadow-${pkg.id === 3 ? 'purple' : 'indigo'}-500/30 
              transition-all duration-300 w-full group`}
                                                 data-aos="fade-up"
                                                 data-aos-delay={index * 100}
                                          >
                                                 
                                                 <h3 className="text-xl font-semibold text-white mb-2 text-center 
              group-hover:text-${pkg.id === 3 ? 'purple' : 'indigo'}-400 transition-colors duration-300">
                                                        Package {pkg.id}
                                                 </h3>
                                                 <p className="text-3xl font-bold text-${pkg.id === 3 ? 'purple' : 'indigo'}-400 mb-3 text-center">
                                                        ₹{pkg.amount.toLocaleString()}
                                                 </p>
                                                 <p className="text-sm text-gray-500 mb-4 text-center">
                                                        One Time Investment
                                                 </p>
                                                 <ul className="text-gray-400 mb-6 space-y-2">
                                                        <li className="flex items-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M5 13l4 4L19 7"
                                                                      />
                                                               </svg>
                                                               Daily Income: ₹{pkg.dailyIncome.toLocaleString()}
                                                        </li>
                                                        <li className="flex items-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M5 13l4 4L19 7"
                                                                      />
                                                               </svg>
                                                               Contract Duration: 20 Days
                                                        </li>
                                                        <li className="flex items-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M5 13l4 4L19 7"
                                                                      />
                                                               </svg>
                                                               Total Return: ₹{(pkg.dailyIncome * 200).toLocaleString()}
                                                        </li>
                                                        <li className="flex items-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M5 13l4 4L19 7"
                                                                      />
                                                               </svg>
                                                               Direct Income: 10%
                                                        </li>
                                                 </ul>
                                                 <Link to={`/join/${pkg.id}`}>
                                                        <button
                                                               className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                               py-3 px-6 rounded-full hover:from-indigo-700 hover:to-purple-700 
                               transition-all duration-300 text-md md:text-lg font-semibold 
                               focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 
                               shadow-md hover:shadow-lg"
                                                        >
                                                               Join Now
                                                        </button>
                                                 </Link>
                                          </div>
                                   ))}
                            </div>
                     </div>
              </section>
       );
};

export default F1;
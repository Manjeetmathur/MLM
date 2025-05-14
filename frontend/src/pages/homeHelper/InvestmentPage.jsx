import React from "react";
import { Link } from "react-router-dom";

const packages = [
       { id: 1, amount: 250, dailyIncome: 25 },
       { id: 2, amount: 500, dailyIncome: 50 },
       { id: 3, amount: 1000, dailyIncome: 100 },
       { id: 4, amount: 2500, dailyIncome: 250 },
       { id: 5, amount: 5000, dailyIncome: 500 },
];

const InvestmentPackages = () => {
       return (
              <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
                     <div className="max-w-6xl mx-auto">
                            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-gray-800">
                                   🔥 Dream Pay 📈📊
                            </h1>
                            <p className="text-center text-lg sm:text-xl mb-10 text-gray-600 font-medium">
                                   Daily ROI: <span className="text-indigo-600 font-semibold">10% for 20 Days</span>
                            </p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                   {packages.map((pkg) => (
                                          <div
                                                 key={pkg.id}
                                                 className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                                          >
                                                 <h2 className="text-xl font-semibold text-gray-800 text-center">
                                                        Package ₹{pkg.amount}
                                                 </h2>
                                                 <p className="text-md text-gray-600 mt-2 text-center">
                                                        Daily Income:{' '}
                                                        <span className="font-semibold text-green-600">₹{pkg.dailyIncome}</span>
                                                 </p>
                                                 <p className="text-md font-medium text-indigo-600 mt-1 text-center">
                                                        Total: ₹{pkg.dailyIncome * 20}
                                                 </p>
                                                 <Link to={`/join/${pkg.id}`}>
                                                        <button className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 text-md font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                               Join Now
                                                        </button>
                                                 </Link>
                                          </div>
                                   ))}
                            </div>
                     </div>
              </div>
       );
};

export default InvestmentPackages;